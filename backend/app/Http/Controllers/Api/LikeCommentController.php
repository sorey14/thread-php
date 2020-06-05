<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Response\ApiResponse;
use App\Action\Comment\LikeCommentAction;
use App\Action\Comment\LikeCommentRequest;


final class LikeController extends ApiController
{
    private $likeCommentAction;

    public function __construct(LikeCommentAction $likeCommentAction )
    {
        $this->likeCommentAction = $likeCommentAction;
    }

    public function likeOrDislikeComment(string $id): ApiResponse
    {
        $response = $this->likeCommentAction->execute(new LikeCOmmentRequest((int)$id));

        return $this->createSuccessResponse(['status' => $response->getStatus()]);
    }
}
