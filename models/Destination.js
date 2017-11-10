const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const slugify = require('slugify');

const destinationSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  slug: String,
  yelpName: String,
  IATA: String,
  description: String,
  image: String
});

destinationSchema.pre('save', async function(next) {
  this.slug = slugify(this.name);
  // Make sure no other destinations have this slug
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9*])?)$`, 'i');
  const destWithSlug = await this.constructor.find({ slug: slugRegex });
  if (destWithSlug.length) {
    this.slug = `${this.slug}-${destWithSlug.length + 1}`;
  }

  next();
});

destinationSchema.statics.randomLocation = function() {
  return this.aggregate([{ $sample: { size: 1 } }]);
};

mongoose.model('Destination', destinationSchema);
