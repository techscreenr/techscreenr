import * as core from 'express-serve-static-core';
import * as express from 'express';

import { ExamCtrl } from './controllers/exam/exam.controller';
import { PerformanceReportsCtrl } from './controllers/performance-reporting/performance-reports.controller';
import { TwilioCtrl } from './controllers/twilio/twilio.controller';
import { UserCtrl } from './controllers/user/user.controller';

/**
 * @export
 * @param {core.Express} app
 */
export default function setRoutes(app: core.Express) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const examCtrl = new ExamCtrl();
  const performanceReportsCtrl = new PerformanceReportsCtrl();
  const twilioCtrl = new TwilioCtrl();

  // Users
  router.route('/login/:username/:password').post(userCtrl.login);

  // Exam
  router.route('/examQuestions').post(examCtrl.getQuestions);

  // Performance Reporting
  router.route('/examResults').post(performanceReportsCtrl.postExamResults);

  // Twilio
  router.route('/token').get(twilioCtrl.getToken);
  router.route('/getVideo/:roomId').get(twilioCtrl.getTwilioVideo);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
