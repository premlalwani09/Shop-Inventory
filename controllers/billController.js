const Bill = require('../models/bill');
const Item = require('../models/item');

// Create a Bill with Auto-Generated Item IDs
exports.createBill = async (req, res) => {
  try {
    const { items } = req.body;
    let totalAmount = 0;

    for (const billItem of items) {
      let item = await Item.findById(billItem.item);

      // If item doesn't exist, create it
      if (!item) {
        item = new Item({
          name: billItem.name, // Assuming you pass item name in request
          price: billItem.price, // Assuming you pass item price in request
          quantity: billItem.quantity // Initial quantity for the item
        });
        await item.save();
      }

      // Check if sufficient quantity is available
      if (item.quantity < billItem.quantity) {
        return res.status(400).json({ error: 'Insufficient stock' });
      }

      totalAmount += item.price * billItem.quantity;
      item.quantity -= billItem.quantity;
      await item.save();

      // Replace item reference with the newly created/updated item ID
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
