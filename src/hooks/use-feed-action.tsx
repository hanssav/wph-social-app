import { likeService } from '@/services';
import { Post } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Heart,
  MessageCircleMore,
  Send,
  Bookmark,
  LucideIcon,
} from 'lucide-react';
import { useState } from 'react';

export type FeedIconAction = {
  id: string;
  icon: LucideIcon;
  filledIcon?: LucideIcon;
  iconValue: number | boolean | undefined;
  labelValue?: number | boolean;
  onIconAction: () => void;
  onLabelAction: () => void;
  isLoading?: boolean;
  isActive?: boolean;
};

type UseFeedActionsProps = {
  post: Post | undefined;
  onShowLikes: () => void;
  onShowComments: () => void;
  onShowShare: () => void;
};

export const useFeedActions = ({
  post,
  onShowLikes,
  onShowComments,
  onShowShare,
}: UseFeedActionsProps) => {
  const queryClient = useQueryClient();

  const [like, setLike] = useState({
    value: post?.likedByMe ?? false,
    count: post?.likeCount ?? 0,
  });

  const likeMutation = useMutation({
    mutationFn: likeService.add,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
    onError: () => {
      setLike({
        value: post?.likedByMe ?? false,
        count: post?.likeCount ?? 0,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', 'post'] });
    },
  });

  const delLikeMutation = useMutation({
    mutationFn: likeService.delete,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
    onError: () => {
      setLike({
        value: post?.likedByMe ?? false,
        count: post?.likeCount ?? 0,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', 'post'] });
    },
  });

  const handleLike = () => {
    if (!post?.id) return;
    setLike((prev) => ({
      value: !prev.value,
      count: prev.value ? prev.count - 1 : prev.count + 1,
    }));
    if (like.value) {
      delLikeMutation.mutate(post.id);
    } else {
      likeMutation.mutate(post.id);
    }
  };

  const FEED_CARD_ICONS: FeedIconAction[] = [
    {
      id: 'like',
      icon: Heart,
      iconValue: like.value,
      labelValue: like.count,
      onIconAction: handleLike,
      onLabelAction: onShowLikes,
      isLoading: likeMutation.isPending || delLikeMutation.isPending,
    },
    {
      id: 'comment',
      icon: MessageCircleMore,
      iconValue: post?.commentCount,
      onIconAction: onShowComments,
      onLabelAction: onShowComments,
    },
    {
      id: 'share',
      icon: Send,
      iconValue: post?.shareCount ?? 0,
      onIconAction: onShowShare,
      onLabelAction: onShowShare,
    },
    {
      id: 'save',
      icon: Bookmark,
      iconValue: false,
      onIconAction: () => {},
      onLabelAction: () => {},
    },
  ];

  return { iconActions: FEED_CARD_ICONS };
};
