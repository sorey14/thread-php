<?php

declare(strict_types = 1);

namespace App\Http\Presenter;

use App\Entity\Comment;
use Illuminate\Support\Collection;

final class CommentArrayPresenter implements CollectionAsArrayPresenter
{
    private $userPresenter;
    private $likeArrayPresenter;

    public function __construct(UserArrayPresenter $userPresenter, LikeArrayPresenter $likeArrayPresenter)
    {
        $this->userPresenter = $userPresenter;
        $this->likeArrayPresenter = $likeArrayPresenter;
    }

    public function present(Comment $comment): array
    {
        var_dump($comment);
        return [
            'id' => $comment->getId(),
            'body' => $comment->getBody(),
            'image_url' => $comment->getImageUrl(),
            'created_at' => $comment->getCreatedAt()->toDateTimeString(),
            'author' => $this->userPresenter->present($comment->getAuthor()),
            'comments_count' => $comment->getCommentsCount(),
            'likes_count' => $comment->getLikesCount(),
            'likes' => $this->likeArrayPresenter->presentCollection($comment->likes)
        ];
    }

    public function presentCollection(Collection $collection): array
    {
        return $collection
            ->map(
                function (Comment $comment) {
                    return $this->present($comment);
                }
            )
            ->all();
    }
}
