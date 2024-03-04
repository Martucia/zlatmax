const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Basket = require('../models/Basket')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')


router.post(
    '/reg', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
        .isLength({ min: 1 })
],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации'
                })
            }

            const { name, email, password, isAdmin } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Такой email занят' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({ name, email, password: hashedPassword, isAdmin })

            const basket = new Basket({ owner: user._id })

            await basket.save()

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })


router.post(
    '/log', [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            // console.log(1, user)

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }

            const token = jwt.sign({ userId: user.id },
                config.get('jwtSecret'), { expiresIn: '6h' }
            )

            const basket = await Basket.findOne({ owner: user._id })
                .populate('products')
                .populate({
                    path: 'products',
                    populate: {
                        path: 'data'
                    }
                })

            // console.log("basket - login", basket)

            if (user.isAdmin) {
                return res.status(200).json({
                    message: 'Админ ввошел',
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    },
                    basket: basket.products,
                    isAdmin: true
                })
            }

            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                basket: basket.products,
            })

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.get('/', authMiddleware,
    async (req, res) => {
        try {

            const user = await User.findOne({ _id: req.user.userId })

            const token = jwt.sign({ userId: user._id }, config.get("jwtSecret"), { expiresIn: "6h" })

            // const basket = await Basket.findOne({ owner: user._id }).populate('products')
            const basket = await Basket.findOne({ owner: user._id })
                .populate('products')
                .populate({
                    path: 'products',
                    populate: {
                        path: 'data'
                    }
                })

            // console.log("basket - auth", basket)

            if (user.isAdmin) {
                return res.status(200).json({
                    message: 'Админ ввошел',
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    },
                    basket: basket.products,
                    isAdmin: true
                })
            }

            return res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                basket: basket.products
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


module.exports = router