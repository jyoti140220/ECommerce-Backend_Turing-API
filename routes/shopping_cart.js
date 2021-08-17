const express=require('express')
const router=express.Router()

const {genrateUniqueId,addProductInCart,getShoppingCartById,updateCartByItem,deleteCartByCart_Id,moveProductToCart,getTotalAmountByCartId,saveForLaterInLaterTB,getSavedFromLaterTable,removeProductInCart}=require('../controller/shopping_cart.js')


router.get('/shoppingcart/generateuniqueid',genrateUniqueId)
router.post('/shoppingcart/add',addProductInCart)
router.get('/shoppingcart/:cart_id',getShoppingCartById)
router.put('/shoppingcart/update/:item_id',updateCartByItem)
router.delete('/shoppingcart/empty/:cart_id',deleteCartByCart_Id)
router.get('/shoppingcart/movetocart/:item_id',moveProductToCart)
router.get('/shoppingcart/totalamount/:cart_id',getTotalAmountByCartId)
router.get('/shoppingcart/saveforlater/:item_id',saveForLaterInLaterTB)
router.get('/shoppingcart/getsaved/:cart_id',getSavedFromLaterTable)
router.delete('/shoppingcart/removeproduct/:item_id',removeProductInCart)







module.exports=router