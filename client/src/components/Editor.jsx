import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import deleteImg from "../images/delete-image.svg"
import addNew from "../images/add-new.svg"
import { useParams, useNavigate } from "react-router-dom";
import { editProduct, addNewProduct } from '../actions/product';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FileBase64 from 'react-file-base64';

const Editor = () => {
    const [catalogImage, setCatalogImages] = useState(null)
    const [images, setImages] = useState([])
    const [product, setProduct] = useState(null)

    const isAdmin = useSelector(state => state.user.isAdmin);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        document.body.classList.add("noscroll");
    }, [])

    const { register, handleSubmit, setValue, ref, reset, formState: { errors } } = useForm({
        mode: 'onChange',
    });

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/catalog/${id}`).then((response) => {
                setProduct(response.data.product);

                setImages(response.data.product.productImg);
                setCatalogImages(response.data.product.catalogImg)
                reset(
                    {
                        catalogImg: response.data.product.catalogImg,
                        productImg: response.data.product.productImg,
                        inStock: response.data.product.inStock,
                        name: response.data.product.name,
                        price: response.data.product.price,
                        onsale: response.data.product.onsale,
                        discount: response.data.product.discount,
                        description: response.data.product.description,
                        size: response.data.product.size,
                        serie: response.data.product.serie,
                        trademark: response.data.product.trademark,
                        material: response.data.product.material,
                        manufacture: response.data.product.manufacture,
                        steel: response.data.product.steel,
                        handle: response.data.product.handle,
                        guardback: response.data.product.guardback,
                        gilding: response.data.product.gilding
                    },
                );
            });
        }

    }, [id])


    const onSubmit = async (data) => {

        if (!product) {
            dispatch(addNewProduct(data))
        } else {
            dispatch(editProduct(data, id))
        }

        navigate(-1);
        document.body.classList.remove("noscroll");
        reset()
    };

    useEffect(() => {
        setValue("productImg", images)
    }, [images, setValue])


    if (!isAdmin) return <Navigate to="/" replace />

    return (
        <div className="modal">
            <div className="modal__content editor">
                <button className="close" onClick={() => {
                    document.body.classList.remove("noscroll");
                    navigate(-1);
                }} >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.3536 5.64645C18.5488 5.84171 18.5488 6.15829 18.3536 6.35355L6.35355 18.3536C6.15829 18.5488 5.84171 18.5488 5.64645 18.3536C5.45118 18.1583 5.45118 17.8417 5.64645 17.6464L17.6464 5.64645C17.8417 5.45118 18.1583 5.45118 18.3536 5.64645Z" fill="#414141" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.64645 5.64645C5.84171 5.45118 6.15829 5.45118 6.35355 5.64645L18.3536 17.6464C18.5488 17.8417 18.5488 18.1583 18.3536 18.3536C18.1583 18.5488 17.8417 18.5488 17.6464 18.3536L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645Z" fill="#414141" />
                    </svg>
                </button>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form__row">
                        <label>Фото для каталога</label>
                        <div className="form__photos">
                            {!catalogImage ? <div className="form__photo add-new" style={{ backgroundImage: `url(${addNew})`, backgroundRepeat: 'no-repeat', backgroundPosition: "center" }}>
                                <FileBase64
                                    className="add-new"
                                    multiple={false}
                                    onDone={({ base64 }) => {
                                        setCatalogImages(base64);
                                        setValue("catalogImg", base64)

                                    }}
                                    {...register('catalogImg', {
                                        required: errorText,
                                    })}
                                />
                            </div>
                                : <div className="form__photo">
                                    <div className="img">
                                        <img className='image' src={catalogImage} alt="" />
                                        <p className="delete" onClick={() => {
                                            setCatalogImages(null);
                                            setValue("catalogImg", null)
                                        }}>
                                            <img src={deleteImg} alt="" />
                                        </p>
                                    </div>
                                </div>}

                        </div>
                        <div className="error">
                            {errors?.catalogImg && <p>{errors?.catalogImg?.message} </p>}
                        </div>
                    </div>

                    <FormImages images={images} setImages={setImages} setValue={setValue} register={register} errors={errors} />

                    <div className="form__row">
                        <label className='check-label'>
                            <input
                                type="checkbox"
                                {...register('inStock')}
                            />
                            В наявности
                        </label>
                    </div>

                    <FormRow label="Название" type="text" name="name" register={register} errors={errors.name} />
                    <FormRow label="Цена" ref={ref} type="number" name="price" register={register} errors={errors.price} />
                    <div className="form__row">
                        <label className='check-label'>
                            <input
                                type="checkbox"
                                {...register('onsale')}
                            />
                            Скидка
                        </label>
                    </div>

                    <FormRow label="Цена со скидкой" type="number" defaultValue="0" name="discount" register={register} errors={errors.discount} />
                    <div className="form__row">
                        <label>
                            Описание:
                            <textarea placeholder="Введите описание товара" {...register('description', { required: errorText })} cols="30" rows="10" />
                        </label>
                        <div className="error">
                            {errors?.description && <p>{errors?.description?.message} </p>}
                        </div>
                    </div>
                    <FormRow label="Размер" name="size" type="text" register={register} errors={errors.size} />
                    <FormRow label="Серия" name="serie" type="text" register={register} errors={errors.serie} />
                    <FormRow label="Товарный знак" name="trademark" type="text" register={register} errors={errors.trademark} />
                    <FormRow label="Материалы" name="material" type="text" register={register} errors={errors.material} />
                    <FormRow label="Производство" name="manufacture" type="text" register={register} errors={errors.manufacture} />
                    <FormRow label="Сталь" name="steel" type="text" register={register} errors={errors.steel} />
                    <FormRow label="Ручка" name="handle" type="text" register={register} errors={errors.handle} />
                    <FormRow label="Гарда и тыльник" name="guardback" type="text" register={register} errors={errors.guardback} />

                    <div className="form__row">
                        <label className='check-label'>
                            <input
                                type="checkbox"
                                {...register('gilding')}
                            />
                            Наявность золочение
                        </label>
                    </div>

                    <input type="submit" className='form-send' />
                </form>

            </div>
        </div>
    );
}


const FormImages = (props) => {
    return (
        <div className="form__row">
            <label>Фото для страницы продукта</label>
            <div className="form__photos">
                {props.images.length > 0 ? props.images.map(image => {
                    return (
                        <div className="form__photo">
                            <div className="img">
                                <img className='image' src={image.url} alt="" />
                                <p className="delete" onClick={() => {
                                    props.setImages(props.images.filter(item => item.url !== image.url))
                                }}>
                                    <img src={deleteImg} alt="" />
                                </p>
                            </div>
                        </div>)
                }) : ''}
                <div className="form__photo add-new" style={{ backgroundImage: `url(${addNew})`, backgroundRepeat: 'no-repeat', backgroundPosition: "center" }}>
                    <FileBase64
                        className="add-new"
                        multiple={true}
                        onDone={data => {
                            const img = {
                                isMain: props.images.length > 0 ? false : true,
                                url: data[0].base64
                            }

                            props.setImages([...props.images, img]);

                            props.setValue("productImg", v => [...v, ...props.images])

                        }}
                        {...props.register('productImg', {
                            required: errorText,
                        })}
                    />
                </div>
            </div>
            <div className="error" style={{ marginTop: "40px" }}>
                {props.errors?.productImg && <p>{props.errors?.productImg?.message} </p>}
            </div>
        </div >
    );
}

const errorText = "Поле обязательно к заполнению!"

const FormRow = (props) => {
    return (
        <div className="form__row">
            <label>
                {props.label}:
                {props.name === "discount" && <span>
                    roiro
                </span>}
                <input
                    type={props.type || "text"}
                    ref={props.ref ? props.ref : ''}
                    defaultValue={props.defaultValue || ''}
                    {...props.register(props.name, {
                        required: errorText,
                    }
                    )}
                />
            </label>
            <div className="error">
                {props.errors && <p>{props.errors.message} </p>}
            </div>
        </div>
    )
}

export default Editor;