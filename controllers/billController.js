const Bill = require('../models/bill');
const Item = require('../models/item');

exports.createBill = async (req, res) => {
  try {
    const { items } = req.body;
    let totalAmount = 0;

    for (const billItem of items) {
      let item = await Item.findById(billItem.item);

      if (!item) {
        item = new Item({
          name: billItem.name, 
          price: billItem.price, 
          quantity: billItem.quantity 
        });
        await item.save();
      }

      
      if (item.quantity < billItem.quantity) {
        return res.status(400).json({ error: 'Insufficient stock' });
      }

      totalAmount += item.price * billItem.quantity;
      item.quantity -= billItem.quantity;
      await item.save();

      
      billItem.item = item._id;
    }

    const newBill = new Bill({ items, totalAmount });
    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('items.item');
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('items.item');
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
