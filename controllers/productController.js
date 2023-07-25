const Product = require("../models/Products");

module.exports = {
    createProduct : async(req,res)=>{
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json("Product created succesfully");
        } catch (error) {
            res.status(500).json("failed to create a product");
        }
    },
    updateProduct: async(req,res)=>{
        try {
            const product = await Product.findByIdAndUpdate(req.params.id,req.body);
            res.status(200).json("Product updated successfully");
        } catch (error) {
            res.status(500).json("Failed to update product");
        }
    },
    getAllProducts : async(req,res)=>{
        try {
            const products = await Product.find().sort({createdAt:-1})
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json("failed to get all products");
        }
    },
    getProduct : async(req,res)=>{
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json("failed to get that product");
        }
    },
    deleteProduct:async(req,res)=>{
        try {
            const product = await Product.findByIdAndRemove(req.params.id);
            res.status(200).json("Product deleted successfully");
        } catch (error) {
            res.status(500).json("failed to delete that product");
        }
    },
    searchProduct : async(req,res)=>{
        try {
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "jewellery",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json("failed to get that product");
        }
    }
}