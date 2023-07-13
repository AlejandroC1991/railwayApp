import {
    Router
} from 'express';
import Carts from '../dao/DBmanagers/cartsManager.js';
import Products from '../dao/DBmanagers/productsManager.js';
import {
    productModel
} from '../dao/DBmanagers/models/products.js';

const productsManager = new Products();
const cartsManager = new Carts();

const router = Router();


router.get('/carts', async (req, res) => {
    const carts = await cartsManager.getAll();
    res.render('carts', {
        carts
    });
});



router.get('/products', async (req, res) => {
    const {
        page = 1
    } = req.query;
    const {
        docs: products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage
    } = await productModel.paginate({}, {
        limit: 5,
        page,
        lean: true
    });


    const {
        first_name,
        last_name,
        email
    } = req.session.user;
    const user = {
        first_name,
        last_name,
        email
    };

    res.render('products', {
        products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
        user
    })
});

router.get('/products/:code', async (req, res) => {
    const CODIGO = Number(req.params.code);
    const productsByCode = await productsManager.getProductByCode(CODIGO);

    if (!productsByCode) return res.send({
        message: "NO EXISTE EL PRODUCTO"
    });
    const producto = {
        title: productsByCode.title,
        code: productsByCode.code,
        price: productsByCode.price,
        stock: productsByCode.stock
    }
    res.render('productsByCode', {
        producto
    });
});

router.get('/carts/:idCarrito', async (req, res) => {
    const ID = Number(req.params.idCarrito);
    const cartsByID = await cartsManager.getCartByID(ID);
    if (!cartsByID) return res.send({
        message: "NO EXISTE EL CARRITO"
    });
    const cart = {
        idCarrito: cartsByID.idCarrito,
        products: cartsByID.products
    }
    res.render('cartsByID', {
        cart
    });
});


router.get('/register', (req, res) => {
    res.render('register');
});


router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/', (req, res) => {
    res.render('login');
});


router.get('/reset', (req, res) => {
    res.render('reset');
});

router.get('/profile', (req, res) => {
    res.render('profile', {
        user: req.session.user
    });
});



export default router;