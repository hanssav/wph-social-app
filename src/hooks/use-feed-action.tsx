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
  const { add: saveMutation, remove: unsaveMutation } = useSaveMutation();

  // ====================================
  // STATE: SAVE (Local optimistic state)
  // ====================================
  const [save, setSave] = React.useState({
    value: post?.savedByMe ?? false,
  });

  // ====================================
  // STATE: LIKE (Local optimistic state)
  // ====================================
  const [like, setLike] = useState({
    value: post?.likedByMe ?? false,
    count: post?.likeCount ?? 0,
  });

  // Sync like state when post data changes
  React.useEffect(() => {
    setLike({
      value: post?.likedByMe ?? false,
      count: post?.likeCount ?? 0,
    });
  }, [post?.likedByMe, post?.likeCount]);

  // Sync save state when post data changes
  React.useEffect(() => {
    setSave((prev) => ({
      ...prev,
      value: post?.savedByMe ?? false,
    }));
  }, [post?.savedByMe]);

  // ====================================
  // MUTATION: LIKE
  // ====================================
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

  // ====================================
  // HANDLER: LIKE
  // ====================================
  const handleLike = () => {
    if (!post?.id) return;

    // Optimistic update
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

  // ====================================
  // HANDLER: SAVE
  // ====================================
  const handleSave = () => {
    if (!post?.id) return;

    setSave((prev) => ({
      value: !prev.value,
    }));

    if (save.value) {
      unsaveMutation.mutate(post.id, {
        onError: () => {
          setSave((prev) => ({
            ...prev,
            value: !prev.value,
          }));
        },
      });
    } else {
      saveMutation.mutate(post.id, {
        onError: () => {
          setSave((prev) => ({
            ...prev,
            value: !prev.value,
          }));
        },
      });
    }
  };

  // ====================================
  // ICON ACTIONS CONFIG
  // ====================================
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
      isLoading: saveMutation.isPending || unsaveMutation.isPending,
    },
  ];

  return { iconActions: FEED_CARD_ICONS };
};
