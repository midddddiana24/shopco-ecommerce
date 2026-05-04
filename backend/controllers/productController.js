const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category, search, sort, minPrice, maxPrice, inStockOnly, page = 1, limit = 12 } = req.query;

    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by stock
    if (inStockOnly === 'true' || inStockOnly === true) {
      query.stock = { $gt: 0 };
    }

    // Sort options
    let sortOption = {};
    if (sort === 'price-asc') sortOption.price = 1;
    if (sort === 'price-desc') sortOption.price = -1;
    if (sort === 'name-asc') sortOption.name = 1;
    if (sort === 'name-desc') sortOption.name = -1;
    if (sort === 'newest') sortOption.createdAt = -1;

    // Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate('category', 'name')
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, category, sizes, colors, stock, featured } = req.body;

    // Upload images to Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'shopco/products'
        });
        imageUrls.push(result.secure_url);
        
        // Delete local file
        fs.unlinkSync(file.path);
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      category,
      images: imageUrls,
      sizes: sizes ? JSON.parse(sizes) : [],
      colors: colors ? JSON.parse(colors) : [],
      stock,
      featured: featured === 'true',
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const { name, description, price, originalPrice, category, sizes, colors, stock, featured } = req.body;

    // Upload new images if provided
    let imageUrls = product.images;
    if (req.files && req.files.length > 0) {
      imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'shopco/products'
        });
        imageUrls.push(result.secure_url);
        
        // Delete local file
        fs.unlinkSync(file.path);
      }
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        originalPrice,
        category,
        images: imageUrls,
        sizes: sizes ? JSON.parse(sizes) : product.sizes,
        colors: colors ? JSON.parse(colors) : product.colors,
        stock,
        featured: featured === 'true'
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};