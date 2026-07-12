import { Router } from 'express';
import { analyticsController } from './analytics.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Analytics
 *     description: Operational KPIs and dashboard aggregates
 */

/**
 * @openapi
 * /analytics/overview:
 *   get:
 *     tags: [Analytics]
 *     summary: Get the executive dashboard KPI overview
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Aggregated dashboard metrics }
 *       401: { description: Not authenticated }
 */
router.get('/overview', authenticate, analyticsController.overview);

export default router;
