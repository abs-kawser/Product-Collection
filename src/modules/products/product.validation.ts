import { z } from 'zod';


// Zod Schema for TVariant
const ZVariantSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Zod Schema for TInventory
const ZInventorySchema = z.object({
  quantity: z.number().min(0),
  inStock: z.boolean(),
});



// Zod Schema for TProduct
const ZProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(ZVariantSchema),
  inventory: ZInventorySchema,
});

export default ZProductValidationSchema