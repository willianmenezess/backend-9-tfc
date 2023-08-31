import { Router } from 'express';
import TeamRouter from './TeamRoutes';
import UserRouter from './UserRoutes';
import MatchRouter from './MatchRoutes';
import LeaderBoardRouter from './LeaderBoardRoutes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchRouter);
router.use('/leaderboard', LeaderBoardRouter);

export default router;
