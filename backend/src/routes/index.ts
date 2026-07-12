import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import analyticsRoutes from '../modules/analytics/analytics.routes';
import notificationsRoutes from '../modules/notifications/notifications.routes';
import orgRoutes from '../modules/org/org.routes';
import shiftLogRoutes from '../modules/shift-log/shift-log.routes';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [System]
 *     summary: Liveness probe
 *     responses:
 *       200: { description: Service is healthy }
 */
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    service: 'digilog-api',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/org', orgRoutes);
router.use('/shift-logs', shiftLogRoutes);

export default router;
