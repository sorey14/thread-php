<?php

declare(strict_types=1);

namespace App\Entity;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use InvalidArgumentException;

/**
 * Class Comment
 * @package App\Entity
 * @property int $id
 * @property string $body
 * @property int $author_id
 * @property int $tweet_id
 * @property Carbon $created_at
 * @property int $comments_count
 * @property int $likes_count
 * @property Carbon|null $updated_at
 */
final class Comment extends Model
{
    protected $table = 'comments';

    // Relations to eager load on every query.
    protected $with = ['author', 'likes'];

    // Eager load related entities count each time.
    protected $withCount = ['likes'];

    protected $fillable = [
        'body',
        'author_id',
        'tweet_id',
        'image_url',
    ];

    // append author relation in entity by default
    //protected $with = ['author'];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function tweet(): BelongsTo
    {
        return $this->belongsTo(Tweet::class);
    }

    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getBody(): string
    {
        return $this->body;
    }

    public function getImageUrl(): ?string
    {
        return $this->image_url;
    }

    public function getCreatedAt(): Carbon
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): ?Carbon
    {
        return $this->updated_at;
    }

    public function getAuthorId(): int
    {
        return $this->author_id;
    }

    public function getAuthor(): User
    {
        return $this->author;
    }

    public function edit(string $text): void
    {
        if (empty($text)) {
            throw new InvalidArgumentException('Comment body cannot be empty.');
        }

        $this->body = $text;
    }

    public function getTweetId(): int
    {
        return $this->tweet_id;
    }

    public function changePreviewImage(string $imageUrl): void
    {
        if (empty($imageUrl)) {
            throw new InvalidArgumentException('Empty image url.');
        }

        $this->image_url = $imageUrl;
    }

    public function getCommentsCount(): int
    {
        // cast to int, because if tweet doesn't have comments null will be returned
        return (int)$this->comments_count;
    }
    
        public function getLikesCount(): int
    {
            return (int)$this->likes_count;
    }


}