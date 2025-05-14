const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

const vendorMiddleware = require("../middlewares/vendorMiddleware");
const authMiddleware = require('../middlewares/authMiddleware');

// 1. إنشاء طعام جديد
router.post('/', authMiddleware ,vendorMiddleware , async (req, res) => {
  const { name, price, category, description, image, available, rest } = req.body;

  try {
    const newFood = new Food({
      name,
      price,
      category,
      description,
      image,
      available,
      rest
    });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ message: 'حدث خطأ أثناء إضافة الطعام', error: error.message });
  }
});

// 2. جلب جميع الأطعمة
// 2. جلب جميع الأطعمة مع دعم الفلترة
router.get('/', async (req, res) => {
  try {
    const { category, available } = req.query; // <-- هنا يتم التقاط الفلاتر
    const filter = {};
    if (category) filter.category = category;
    if (available !== undefined) filter.available = available === 'true';

    const foods = await Food.find(filter);
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الأطعمة', error: error.message });
  }
});


// 3. جلب طعام معين حسب الـ ID
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'لم يتم العثور على الطعام' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الطعام', error: error.message });
  }
});

// 4. تحديث طعام معين حسب الـ ID
router.put('/:id', authMiddleware,vendorMiddleware, async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) {
      return res.status(404).json({ message: 'لم يتم العثور على الطعام' });
    }
    res.json(food);
  } catch (error) {
    res.status(400).json({ message: 'حدث خطأ أثناء تحديث الطعام', error: error.message });
  }
});

// 5. حذف طعام معين حسب الـ ID
router.delete('/:id', authMiddleware, vendorMiddleware, async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'لم يتم العثور على الطعام' });
    }
    res.json({ message: 'تم حذف الطعام بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء حذف الطعام', error: error.message });
  }
});

module.exports = router;
