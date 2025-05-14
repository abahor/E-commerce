const express = require('express');
const router = express.Router();
const orderModel = require('../models/orderModel');
const vendorMiddleware = require("../middlewares/vendorMiddleware");
const authMiddleware = require('../middlewares/authMiddleware');

// 1. إنشاء 'طلب' جديد
router.post('/', async (req, res) => {
  const { foods, payment, buyer, status } = req.body;
  console.log(foods)
  try {
    const newOrder = new orderModel({
      foods,
      payment, 
      buyer,
      status: status || 'preparing', // القيمة الافتراضية هي "preparing"
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'حدث خطأ أثناء إضافة الطلب', error: error.message });
  }
});

// 2. جلب جميع الأطعمة
// 2. جلب جميع الأطعمة مع دعم الفلترة
router.get('/', authMiddleware, vendorMiddleware ,async (req, res) => {
  try {

    const orders = await orderModel.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الأطعمة', error: error.message });
  }
});


// 3. جلب طعام معين حسب الـ ID
router.get('/:id', authMiddleware, vendorMiddleware, async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'لم يتم العثور على الطلب' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الطلب', error: error.message });
  }
});

// 4. تحديث طعام معين حسب الـ ID
router.put('/:id', authMiddleware, vendorMiddleware, async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'لم يتم العثور على الطعام' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'حدث خطأ أثناء تحديث الطعام', error: error.message });
  }
});

// 5. حذف طعام معين حسب الـ ID
router.delete('/:id', authMiddleware, vendorMiddleware, async (req, res) => {
  try {
    const order = await orderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'لم يتم العثور على الطعام' });
    }
    res.json({ message: 'تم حذف الطعام بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء حذف الطعام', error: error.message });
  }
});

module.exports = router;
