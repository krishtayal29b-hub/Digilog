import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/ApiResponse';
import { analyticsService } from './analytics.service';

export const analyticsController = {
  overview: asyncHandler(async (_req: Request, res: Response) => {
    const data = await analyticsService.getOverview();
    sendSuccess(res, data);
  }),
};
