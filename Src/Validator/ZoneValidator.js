const { z } = require('zod');

const zoneSchema = z.object({
  zoneName: z.string(),
  details: z.string().optional()
});

module.exports = zoneSchema;
