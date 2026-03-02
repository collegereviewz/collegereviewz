import express from 'express';
import {
    createReview,
    getAllReviews,
    updateUpvote,
    updateDownvote,
    addComment,
    deleteReview,
    updateReview,
    updateComment,
    deleteComment
} from '../controller/review.controller.js';

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', createReview);
router.patch('/:id/upvote', updateUpvote);
router.patch('/:id/downvote', updateDownvote);
router.post('/:id/comment', addComment);
router.put('/:id/comment/:commentId', updateComment);
router.delete('/:id/comment/:commentId', deleteComment);
router.delete('/:id', deleteReview);
router.put('/:id', updateReview);

export default router;
