const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const Product = require('../models/Product')
const BasketProduct = require('../models/BasketProduct')
const User = require('../models/User')
// const Image = require('../models/Image')
const Basket = require('../models/Basket')
const Review = require('../models/Review')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')



router.post(
    '/addproduct',
    // authMiddleware,
    async (req, res) => {

        try {
            const product = req.body

            const newProduct = new Product(product)

            await newProduct.save()

            res.status(201).json({ message: 'Продукт добавлен', product: newProduct })

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.delete(
    '/delete/:id',
    // authMiddleware,
    async (req, res) => {
        try {
            const id = req.params.id.slice(1);

            await Product.findByIdAndDelete(id)

            res.status(201).json({ message: 'Продукт удален' })

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.get(
    '/',

    async (req, res) => {
        try {
            const perPage = 12;
            const total = await Product.count();
            pagesCount = Math.ceil(total / perPage)
            const page = parseInt(req.query.page) || 1;

            let startFrom = (page - 1) * perPage;

            const sort = { inStock: -1 };

            const products = await Product.find().populate('reviews')
                .sort(sort)
                .skip(startFrom)
                .limit(perPage)

            return res.json({ products, count: pagesCount })

        } catch (e) {
            console.log(e)
            res.status(503).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.get(
    '/search',

    async (req, res) => {
        try {


        } catch (e) {
            console.log(e)
            res.status(503).json({ message: 'Search error' })
        }
    })


router.patch(
    '/edit/:id',
    async (req, res) => {
        try {

            const { updates } = req.body

            const id = req.params.id.slice(1);
            const options = { new: true }

            const product = await Product.findByIdAndUpdate(id, updates, options)

            return res.json({ product })

        } catch (e) {
            res.status(500).json({ message: e })
        }
    }
)

router.get(
    '/:id',
    // authMiddleware,
    async (req, res) => {
        try {

            let id = req.params.id.slice(1);

            const product = await Product.findOne({ _id: id }).populate('reviews')

            return res.json({ product })

        } catch (e) {
            res.status(500).json({ message: e })
        }
    })


router.patch(
    '/addtobasket/:id',
    // authMiddleware,
    async (req, res) => {
        try {
            const { id } = req.body;

            const candidate = await Product.findOne({ _id: id });

            if (!candidate) {
                return res.status(400).json({ message: 'Такого продукта не существует' })
            };

            let theId = req.params.id.slice(1);

            const basket = await Basket.findOne({ owner: theId }).populate('products')
                .populate({
                    path: 'products',
                    populate: {
                        path: 'data'
                    }
                })

            const candProduct = await BasketProduct.findOne({ data: candidate }).populate('data')



            if (candProduct) {
                candProduct.count = candProduct.count + 1
                await candProduct.save();
                return res.status(201).json({ message: 'Продукт +1', product: candProduct })
            };

            const product = new BasketProduct({ data: candidate });

            basket.products.push(product)

            await basket.save();

            await product.save();

            return res.status(201).json({ message: 'Продукт добавлен до корзины', product })


        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.delete(
    "/removeproduct",
    // authMiddleware,
    async (req, res) => {
        try {
            const { userId, productId } = req.query

            const basket = await Basket.findOne({ owner: userId }).populate('products')

            basket.products = basket.products.filter(product => product.data._id.toString().replace(/new ObjectId\("(.*)"\)/, "$1") !== productId);

            await basket.save()

            await BasketProduct.findOneAndDelete({ data: productId });

            res.status(204).json({ id: productId })

        } catch (e) {
            res.status(404)
            console.log(e)
            res.send({ error: "Product doesn't exist!" })
        }
    })


router.patch(
    '/addreview',
    // authMiddleware,
    async (req, res) => {
        try {
            const { text, productId, userId, rate } = req.body;

            const user = await User.findOne({ _id: userId })

            const review = new Review({ text, author: user.name, authorId: userId, rate, owner: productId })

            const product = await Product.findOne({ _id: productId }).populate('reviews')

            product.reviews.push(review)

            let allRate = 0;

            product.reviews.forEach(review => {
                allRate += review.rate;
            })

            product.rate = allRate / product.reviews.length;

            await product.save();

            await review.save();

            return res.status(201).json({ message: 'Отзыв отправлен', review })


        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })


router.patch(
    "/removereview",
    // authMiddleware,
    async (req, res) => {
        try {
            const { productId, reviewId } = req.body;

            const product = await Product.findOne({ _id: productId }).populate('reviews')

            await Review.findOneAndDelete({ _id: reviewId, owner: productId })

            product.reviews = product.reviews.filter(review => review._id !== reviewId)

            await product.save();

            return res.status(201).json({ message: 'Отзыв удален', review: reviewId })

        } catch (e) {
            res.status(404)
            console.log(e)
            res.send({ error: "Product doesn't exist!" })
        }
    })

module.exports = router