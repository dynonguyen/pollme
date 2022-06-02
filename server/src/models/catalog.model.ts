import { model, Model, Schema } from 'mongoose';
import Catalog from '../entities/catalog';
import { MAX } from './../constants/validation';

const schema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		maxlength: MAX.CATALOG_NAME,
	},
	voteTotal: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
	},
});

const CatalogModel: Model<Catalog> = model('Catalog', schema, 'catalogs');

export default CatalogModel;
