import ProductController from '../controllers/Product.controller.js'

const routes = application => {
	application.post('/product', ProductController.createProduct)
	application.get('/product', ProductController.getAllProducts)
	application.put('/product/:productId', ProductController.updateProduct)
	application.delete('/product/:productId', ProductController.deleteProduct)
}

export default { routes }