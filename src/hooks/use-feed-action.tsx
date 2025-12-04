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
import React, { useState } from 'react';
import { useSaveMutation } from './use-save';

export type FeedIconAction = {
  id: string;
  icon: LucideIcon;
  filledIcon?: LucideIcon;
  iconValue?: number | boolean | undefined;
  labelValue?: number | boolean;
  onIconAction?: () => void;
  onLabelAction?: () => void;
  isLoading?: boolean;
  isActive?: boolean;
};

type UseFeedActionsProps = {
  post: Post | undefined;
  onShowLikes?: () => void;
  onShowComments?: () => void;
  onShowShare?: () => void;
};

export const useFeedActions = ({
  post,
  onShowLikes,
  onShowComments,
  onShowShare,
}: UseFeedActionsProps) => {
  const queryClient = useQueryClient();
  const { add: saveMutation, remove: unSaveMutation } = useSaveMutation();

  const [save, setSave] = React.useState({
    value: false,
    // NO DATA SAVE COUNT FROM API
    count: 0,
  });
  const [like, setLike] = useState({
    value: post?.likedByMe ?? false,
    count: post?.likeCount ?? 0,
  });

  React.useEffect(() => {
    setLike({
      value: post?.likedByMe ?? false,
      count: post?.likeCount ?? 0,
    });
  }, [post?.likedByMe, post?.likeCount]);

  const likeMutation = useMutation({
    mutationFn: likeService.add,
    onError: () => {
      setLike({
        value: post?.likedByMe ?? false,
        count: post?.likeCount ?? 0,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'feeds',
        refetchType: 'all',
      });
      queryClient.invalidateQueries({ queryKey: ['likes', 'post'] });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const delLikeMutation = useMutation({
    mutationFn: likeService.delete,
    onError: () => {
      setLike({
        value: post?.likedByMe ?? false,
        count: post?.likeCount ?? 0,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'feeds',
        refetchType: 'all',
      });
      queryClient.invalidateQueries({ queryKey: ['likes', 'post'] });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
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

  // NO DATA SAVE ME FROM API
  const handleSave = () => {
    setSave((prev) => ({
      value: !prev.value,
      count: prev.count + 1,
    }));
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
      labelValue: post?.commentCount ?? 0,
      onIconAction: onShowComments,
      onLabelAction: onShowComments,
    },
    {
      id: 'share',
      icon: Send,
      // iconValue: post?.shareCount ?? 0,
      labelValue: post?.shareCount ?? 0,
      onIconAction: onShowShare,
      onLabelAction: onShowShare,
    },
    {
      id: 'save',
      icon: Bookmark,
      iconValue: save.value,
      onIconAction: handleSave,
      onLabelAction: () => {},
    },
  ];

  return { iconActions: FEED_CARD_ICONS };
};
