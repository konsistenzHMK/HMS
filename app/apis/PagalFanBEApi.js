import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import useFetch from 'react-fetch-hook'
import { useIsFocused } from '@react-navigation/native'
import usePrevious from '../utils/usePrevious'
import * as GlobalVariables from '../config/GlobalVariableContext'
import { useMemo } from 'react'


export const updatePostPATCHviewsStatusAndText = (Constants, { postId, views }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/posts?id=eq.${postId ?? ''}`, {
    body: JSON.stringify({ count_views: views }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'PATCH',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const updatePostPATCHViews = (Constants, { postId, views }) =>
  updatePostPATCHviewsStatusAndText(Constants, { postId, views }).then(({ status, statusText, text }) => {
    try {
      return text
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useUpdatePostPATCHViews = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => updatePostPATCHViews(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('posts', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('post')
      queryClient.invalidateQueries('posts')
    },
  })
}


export const fetchAllFollowedByUserGETStatusAndText = (Constants, { followerId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/follows?follower_id=eq.${
      followerId ?? ''
    }&select=*,user_profiles!follows_followee_id_fkey(*)`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllFollowedByUserGET = (Constants, { followerId }) =>
  fetchAllFollowedByUserGETStatusAndText(Constants, { followerId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllFollowedByUserGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['follows', args], () => fetchAllFollowedByUserGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllFollowedByUserGET = ({ children, onData = () => {}, refetchInterval, followerId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllFollowedByUserGET({ followerId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchAllFollowedByUser: refetch,
  })
}

export const fetchAllFollowersOfUserGETStatusAndText = (Constants, { followeeId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/follows?followee_id=eq.${
      followeeId ?? ''
    }&select=*,user_profiles!follows_follower_id_fkey(*)`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllFollowersOfUserGET = (Constants, { followeeId }) =>
  fetchAllFollowersOfUserGETStatusAndText(Constants, { followeeId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllFollowersOfUserGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['follows', args], () => fetchAllFollowersOfUserGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllFollowersOfUserGET = ({ children, onData = () => {}, refetchInterval, followeeId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllFollowersOfUserGET({ followeeId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchAllFollowersOfUser: refetch,
  })
}

export const addNewCommentPOSTStatusAndText = (Constants, { comment_text, post_id, user_id }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/post_comments', {
    body: JSON.stringify({
      post_id: post_id,
      user_id: user_id,
      comment: comment_text,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const addNewCommentPOST = (Constants, { comment_text, post_id, user_id }) =>
  addNewCommentPOSTStatusAndText(Constants, {
    comment_text,
    post_id,
    user_id,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useAddNewCommentPOST = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => addNewCommentPOST(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('comments', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('comment')
      queryClient.invalidateQueries('comments')
    },
  })
}

export const FetchAddNewCommentPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  comment_text,
  post_id,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useAddNewCommentPOST({ comment_text, post_id, user_id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchAddNewComment: refetch })
}

export const addNewFanClubFollowsPOSTStatusAndText = (Constants, { fanclubId, userId }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclub_followers', {
    body: JSON.stringify({ fanclub_id: fanclubId, user_id: userId }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const addNewFanClubFollowsPOST = (Constants, { fanclubId, userId }) =>
  addNewFanClubFollowsPOSTStatusAndText(Constants, { fanclubId, userId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useAddNewFanClubFollowsPOST = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => addNewFanClubFollowsPOST(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('fanclubfollows', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('fanclubfollow')
      queryClient.invalidateQueries('fanclubfollows')
    },
  })
}

export const FetchAddNewFanClubFollowsPOST = ({ children, onData = () => {}, refetchInterval, fanclubId, userId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useAddNewFanClubFollowsPOST({ fanclubId, userId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchAddNewFanClubFollows: refetch,
  })
}

export const addNewFollowPOSTStatusAndText = (Constants, { followee_id, follower_id }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/follows', {
    body: JSON.stringify({
      follower_id: follower_id,
      followee_id: followee_id,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const addNewFollowPOST = (Constants, { followee_id, follower_id }) =>
  addNewFollowPOSTStatusAndText(Constants, { followee_id, follower_id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useAddNewFollowPOST = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => addNewFollowPOST(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('follows', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('follow')
      queryClient.invalidateQueries('follows')
    },
  })
}

export const FetchAddNewFollowPOST = ({ children, onData = () => {}, refetchInterval, followee_id, follower_id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useAddNewFollowPOST({ followee_id, follower_id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchAddNewFollow: refetch })
}

export const addNewMatchCommentPOSTStatusAndText = (Constants, { comment_text, match_id, user_id }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/match_comments', {
    body: JSON.stringify({
      match_id: match_id,
      user_id: user_id,
      comment: comment_text,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const addNewMatchCommentPOST = (Constants, { comment_text, match_id, user_id }) =>
  addNewMatchCommentPOSTStatusAndText(Constants, {
    comment_text,
    match_id,
    user_id,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useAddNewMatchCommentPOST = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => addNewMatchCommentPOST(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('match_comments', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('match_comment')
      queryClient.invalidateQueries('match_comments')
    },
  })
}

export const FetchAddNewMatchCommentPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  comment_text,
  match_id,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useAddNewMatchCommentPOST({ comment_text, match_id, user_id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchAddNewMatchComment: refetch })
}

export const addNewPostPOSTStatusAndText = (Constants, { caption, image_url, posted_by }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/posts?select=id', {
    body: JSON.stringify({
      posted_by_id: posted_by,
      image_path: image_url,
      caption: caption,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const addNewPostPOST = (Constants, { caption, image_url, posted_by }) =>
  addNewPostPOSTStatusAndText(Constants, {
    caption,
    image_url,
    posted_by,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useAddNewPostPOST = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => addNewPostPOST(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('posts', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('post')
      queryClient.invalidateQueries('posts')
    },
  })
}

export const FetchAddNewPostPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  caption,
  image_url,
  posted_by,
}) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useAddNewPostPOST({ caption, image_url, posted_by }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchAddNewPost: refetch })
}

export const addPostLikePOSTStatusAndText = (Constants, { post_id, user_id }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/post_likes', {
    body: JSON.stringify({ post_id: post_id, user_id: user_id }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=representational',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const addPostLikePOST = (Constants, { post_id, user_id }) =>
  addPostLikePOSTStatusAndText(Constants, { post_id, user_id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useAddPostLikePOST = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => addPostLikePOST(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('likes', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('like')
      queryClient.invalidateQueries('likes')
    },
  })
}

export const FetchAddPostLikePOST = ({ children, onData = () => {}, refetchInterval, post_id, user_id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, mutate: refetch } = useAddPostLikePOST({ post_id, user_id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchAddPostLike: refetch })
}

export const addPostSavePOSTStatusAndText = (Constants, { post_id, user_id }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/post_saves', {
    body: JSON.stringify({ post_id: post_id, user_id: user_id }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const addPostSavePOST = (Constants, { post_id, user_id }) =>
  addPostSavePOSTStatusAndText(Constants, { post_id, user_id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useAddPostSavePOST = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => addPostSavePOST(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('saves', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('save')
      queryClient.invalidateQueries('saves')
    },
  })
}

export const FetchAddPostSavePOST = ({ children, onData = () => {}, refetchInterval, post_id, user_id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, mutate: refetch } = useAddPostSavePOST({ post_id, user_id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchAddPostSave: refetch })
}

export const createUserProfilePOSTStatusAndText = (
  Constants,
  { age, firstName, lastName, sportsList, userId, userOnboarded, imgUrl },
) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/user_profiles', {
    body: JSON.stringify({
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      age: age,
      sports_preferences: sportsList,
      onboarded: userOnboarded,
      profile_image: imgUrl,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const createUserProfilePOST = (
  Constants,
  { age, firstName, lastName, sportsList, userId, userOnboarded, imgUrl },
) =>
  createUserProfilePOSTStatusAndText(Constants, {
    age,
    firstName,
    lastName,
    sportsList,
    userId,
    userOnboarded,
    imgUrl,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useCreateUserProfilePOST = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => createUserProfilePOST(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('users', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('user')
      queryClient.invalidateQueries('users')
    },
  })
}

export const FetchCreateUserProfilePOST = ({
  children,
  onData = () => {},
  refetchInterval,
  age,
  firstName,
  lastName,
  sportsList,
  userId,
  userOnboarded,
}) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCreateUserProfilePOST({ age, firstName, lastName, sportsList, userId, userOnboarded }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchCreateUserProfile: refetch })
}

export const deleteFanClubFollowsDELETEStatusAndText = (Constants, { fanclubId, userId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclub_followers?fanclub_id=eq.${fanclubId ?? ''}&user_id=eq.${
      userId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
      method: 'DELETE',
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const deleteFanClubFollowsDELETE = (Constants, { fanclubId, userId }) =>
  deleteFanClubFollowsDELETEStatusAndText(Constants, {
    fanclubId,
    userId,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useDeleteFanClubFollowsDELETE = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => deleteFanClubFollowsDELETE(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('fanclubfollows', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('fanclubfollow')
      queryClient.invalidateQueries('fanclubfollows')
    },
  })
}

export const deleteFollowDELETEStatusAndText = (Constants, { followedId, followerId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/follows?followee_id=eq.${followedId ?? ''}&follower_id=eq.${
      followerId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
      method: 'DELETE',
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const deleteFollowDELETE = (Constants, { followedId, followerId }) =>
  deleteFollowDELETEStatusAndText(Constants, { followedId, followerId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useDeleteFollowDELETE = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => deleteFollowDELETE(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('follows', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('follow')
      queryClient.invalidateQueries('follows')
    },
  })
}

export const deletePostLikeDELETEStatusAndText = (Constants, { postId, userId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/post_likes?post_id=eq.${postId ?? ''}&user_id=eq.${userId ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
      method: 'DELETE',
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const deletePostLikeDELETE = (Constants, { postId, userId }) =>
  deletePostLikeDELETEStatusAndText(Constants, { postId, userId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useDeletePostLikeDELETE = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => deletePostLikeDELETE(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('likes', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('like')
      queryClient.invalidateQueries('likes')
    },
  })
}

export const deletePostSaveDELETEStatusAndText = (Constants, { postId, userId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/post_saves?post_id=eq.${postId ?? ''}&user_id=eq.${userId ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
      method: 'DELETE',
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const deletePostSaveDELETE = (Constants, { postId, userId }) =>
  deletePostSaveDELETEStatusAndText(Constants, { postId, userId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useDeletePostSaveDELETE = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => deletePostSaveDELETE(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('saves', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('save')
      queryClient.invalidateQueries('saves')
    },
  })
}

export const fetchAllCommentsForAMatchGETStatusAndText = (Constants, { id }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/match_comments?match_id=eq.${
      id ?? ''
    }&order=created_at.desc&select=*,user_profiles(first_name,last_name,profile_image)`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllCommentsForAMatchGET = (Constants, { id }) =>
  fetchAllCommentsForAMatchGETStatusAndText(Constants, { id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllCommentsForAMatchGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['match_comments', args], () => fetchAllCommentsForAMatchGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllCommentsForAMatchGET = ({ children, onData = () => {}, refetchInterval, id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllCommentsForAMatchGET({ id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchAllCommentsForAMatch: refetch,
  })
}

export const fetchAllCommentsForAPostGETStatusAndText = (Constants, { id }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/post_comments?post_id=eq.${
      id ?? ''
    }&order=created_at.desc&select=*,user_profiles(*)`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllCommentsForAPostGET = (Constants, { id }) =>
  fetchAllCommentsForAPostGETStatusAndText(Constants, { id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllCommentsForAPostGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['comments', args], () => fetchAllCommentsForAPostGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllCommentsForAPostGET = ({ children, onData = () => {}, refetchInterval, id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllCommentsForAPostGET({ id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchAllCommentsForAPost: refetch,
  })
}

export const fetchAllFanClubsGETStatusAndText = (Constants) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclubs?select=*,teams(*)', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllFanClubsGET = (Constants) =>
  fetchAllFanClubsGETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllFanClubsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['fanclubs', args], () => fetchAllFanClubsGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllFanClubsGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllFanClubsGET({}, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchAllFanClubs: refetch })
}

export const fetchAllFanClubsForPostTagGETStatusAndText = (Constants) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclubs?select=id,name', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllFanClubsForPostTagGET = (Constants) =>
  fetchAllFanClubsForPostTagGETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllFanClubsForPostTagGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['fanclubs', args], () => fetchAllFanClubsForPostTagGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllFanClubsForPostTagGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllFanClubsForPostTagGET({}, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchAllFanClubsForPostTag: refetch,
  })
}

export const fetchAllMatchTitlesForPostTagGETStatusAndText = (Constants) =>
  fetch(
    'https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/matches?match_date=lte.now()&order=match_date.desc&select=id,name:title',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllMatchTitlesForPostTagGET = (Constants) =>
  fetchAllMatchTitlesForPostTagGETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllMatchTitlesForPostTagGET = () => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()

  return useFetch(
    'https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/matches?match_date=lte.now()&order=match_date.desc&select=id,name:title',
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  )
}

export const FetchFetchAllMatchTitlesForPostTagGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const refetch = () => {}
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    'https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/matches?match_date=lte.now()&order=match_date.desc&select=id,name:title',
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  )

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchAllMatchTitlesForPostTag: refetch,
  })
}

export const fetchAllMatchesGETStatusAndText = (Constants) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/matches?order=match_date&select=*,team_1(*),team_2(*)', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllMatchesGET = (Constants) =>
  fetchAllMatchesGETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllMatchesGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['matches', args], () => fetchAllMatchesGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllMatchesGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllMatchesGET({}, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchAllMatches: refetch })
}

export const fetchAllPastMatchesGETStatusAndText = (Constants, args) =>
  fetch(
    'https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/matches?match_date=lt.now()&order=match_date.desc&select=*,team_1(*),team_2(*)',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllPastMatchesGET = (Constants, args) =>
  fetchAllPastMatchesGETStatusAndText(Constants, args).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllPastMatchesGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['matches_pasts', args], () => fetchAllPastMatchesGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllPastMatchesGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)
  const PER_PAGE = 10
  const [page, setPage] = React.useState(1)
  const limitAndOffset = useMemo(() => {
    return {
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE || 0,
    }
  }, [page])
  const [hasNextPage, setHasNextPage] = React.useState(true)
  const [posts, setPosts] = React.useState([])

  const { loading, data, error, refetch } = useFetchAllPastMatchesGET(limitAndOffset, { refetchInterval })

  React.useEffect(() => {
    if (data?.length < PER_PAGE) {
      setHasNextPage(false)
    }

    if (data) {
      setPosts((prev) => [...prev, ...data])
    }
  }, [data])

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data: posts,
    error,
    nextPage: () => {
      if (hasNextPage) {
        if (!loading) {
          setPage(page + 1)
          // refetch()
        }
      }

      // setPage(page + 1)
      // setPage(page + 1)
      // refetch()
    },
    refetchFetchAllPastMatches: (page) => {
      console.log('abc next page page', page)
      // if (hasNextPage) setPage(page)
      // refetch()
    },
  })
}

export const fetchAllPostsGETStatusAndText = (Constants, args) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/posts?order=id.desc&limit=${args.limit}&offset=${args.offset}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllPostsGET = (Constants, args) =>
  fetchAllPostsGETStatusAndText(Constants, args).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllPostsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['posts', args], () => fetchAllPostsGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllPostsGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const PER_PAGE = 10
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)
  const [page, setPage] = React.useState(1)
  const limitAndOffset = useMemo(() => {
    return {
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE || 0,
    }
  }, [page])
  const [posts, setPosts] = React.useState([])

  const { loading, data, error, refetch } = useFetchAllPostsGET(
    {
      ...limitAndOffset,
    },
    { refetchInterval },
  )

  React.useEffect(() => {
    if (data) {
      setPosts((prev) => [...prev, ...data])
    }
  }, [data])

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data: posts,
    error,
    refetchFetchAllPosts: refetch,
    nextPage: () => {
      if (data?.length >= PER_PAGE) {
        if (!loading) setPage(page + 1)
      }
    },
  })
}

export const fetchAllPostsSavedByUserGETStatusAndText = (Constants, { userId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/post_saves?select=*,posts!post_saves_post_id_fkey(*)&user_id=eq.${
      userId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllPostsSavedByUserGET = (Constants, { userId }) =>
  fetchAllPostsSavedByUserGETStatusAndText(Constants, { userId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllPostsSavedByUserGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['saves', args], () => fetchAllPostsSavedByUserGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllPostsSavedByUserGET = ({ children, onData = () => {}, refetchInterval, userId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllPostsSavedByUserGET({ userId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchAllPostsSavedByUser: refetch,
  })
}

export const fetchAllPostsTaggedByFanclubNameGETStatusAndText = (Constants, { substring }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/posts?caption=ilike.*${substring ?? ''}*`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllPostsTaggedByFanclubNameGET = (Constants, { substring }) =>
  fetchAllPostsTaggedByFanclubNameGETStatusAndText(Constants, {
    substring,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllPostsTaggedByFanclubNameGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['posts', args], () => fetchAllPostsTaggedByFanclubNameGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllPostsTaggedByFanclubNameGET = ({
  children,
  onData = () => {},
  refetchInterval,
  substring,
}) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllPostsTaggedByFanclubNameGET({ substring }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchAllPostsTaggedByFanclubName: refetch,
  })
}

export const fetchAllPostsUploadedByUserGETStatusAndText = (Constants, { userId }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/posts?posted_by_id=eq.${userId ?? ''}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllPostsUploadedByUserGET = (Constants, { userId }) =>
  fetchAllPostsUploadedByUserGETStatusAndText(Constants, { userId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllPostsUploadedByUserGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['posts', args], () => fetchAllPostsUploadedByUserGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllPostsUploadedByUserGET = ({ children, onData = () => {}, refetchInterval, userId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllPostsUploadedByUserGET({ userId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchAllPostsUploadedByUser: refetch,
  })
}

export const fetchAllSportsGETStatusAndText = (Constants) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/sports_list?select=id,name', {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllSportsGET = (Constants) =>
  fetchAllSportsGETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllSportsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['sports', args], () => fetchAllSportsGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllSportsGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllSportsGET({}, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchAllSports: refetch })
}

export const fetchAllUpcomingMatchesGETStatusAndText = (Constants) =>
  fetch(
    'https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/matches?match_date=gte.now()&order=match_date&select=*,team_1(*),team_2(*)',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchAllUpcomingMatchesGET = (Constants) =>
  fetchAllUpcomingMatchesGETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchAllUpcomingMatchesGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['matches_futures', args], () => fetchAllUpcomingMatchesGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchAllUpcomingMatchesGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchAllUpcomingMatchesGET({}, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchAllUpcomingMatches: refetch,
  })
}

export const fetchFanClubsFollowedByUserGETStatusAndText = (Constants, { userId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclub_followers?select=*,fanclubs(*,teams(team_name,logo_path))&user_id=eq.${
      userId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchFanClubsFollowedByUserGET = (Constants, { userId }) =>
  fetchFanClubsFollowedByUserGETStatusAndText(Constants, { userId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchFanClubsFollowedByUserGET = ({ userId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()

  return useFetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclub_followers?select=*,fanclubs(*,teams(team_name,logo_path))&user_id=eq.${
      userId ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  )
}

export const FetchFetchFanClubsFollowedByUserGET = ({ children, onData = () => {}, refetchInterval, userId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)
  const lastFetch = React.useRef(Date.now())

  const refetch = () => {
    lastFetch.current = Date.now()
  }
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclub_followers?select=*,fanclubs(*,teams(team_name,logo_path))&user_id=eq.${
      userId ?? ''
    }`,
    {
      depends: [isFocused, lastFetch.current],
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  )

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchFanClubsFollowedByUser: refetch,
  })
}

export const fetchFanClubsNotFollowedByUserGETStatusAndText = (Constants) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/notfollowed_fanclubs?select=*,teams(*)', {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchFanClubsNotFollowedByUserGET = (Constants) =>
  fetchFanClubsNotFollowedByUserGETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchFanClubsNotFollowedByUserGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['fanclubfollows', args], () => fetchFanClubsNotFollowedByUserGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchFanClubsNotFollowedByUserGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchFanClubsNotFollowedByUserGET({}, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchFanClubsNotFollowedByUser: refetch,
  })
}

export const fetchFeedForSingleMatchGETStatusAndText = (Constants, { matchid }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/match_feed?match_id=eq.${matchid ?? ''}&select=match_data`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchFeedForSingleMatchGET = (Constants, { matchid }) =>
  fetchFeedForSingleMatchGETStatusAndText(Constants, { matchid }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchFeedForSingleMatchGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['scores', args], () => fetchFeedForSingleMatchGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchFeedForSingleMatchGET = ({ children, onData = () => {}, refetchInterval, matchid }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchFeedForSingleMatchGET({ matchid }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchFeedForSingleMatch: refetch,
  })
}

export const fetchNextBakarrSessionGETStatusAndText = (Constants) =>
  fetch(
    'https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/match_talks?limit=1&order=session_start.asc&session_end=gte.now()',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchNextBakarrSessionGET = (Constants) =>
  fetchNextBakarrSessionGETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchNextBakarrSessionGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['bakarr', args], () => fetchNextBakarrSessionGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['bakarrs']),
  })
}

export const FetchFetchNextBakarrSessionGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchNextBakarrSessionGET({}, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchNextBakarrSession: refetch,
  })
}

export const fetchNextBakarrSessionForMatchGETStatusAndText = (Constants, { matchId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/match_talks?limit=1&match_id=eq.${
      matchId ?? ''
    }&order=session_start.asc&session_end=gte.now()`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchNextBakarrSessionForMatchGET = (Constants, { matchId }) =>
  fetchNextBakarrSessionForMatchGETStatusAndText(Constants, { matchId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchNextBakarrSessionForMatchGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['bakarr', args], () => fetchNextBakarrSessionForMatchGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['bakarrs']),
  })
}

export const FetchFetchNextBakarrSessionForMatchGET = ({ children, onData = () => {}, refetchInterval, matchId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchNextBakarrSessionForMatchGET({ matchId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchNextBakarrSessionForMatch: refetch,
  })
}

export const fetchPostLikeGETStatusAndText = (Constants, { postId, userId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/post_likes?post_id=eq.${postId ?? ''}&select=*&user_id=eq.${
      userId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchPostLikeGET = (Constants, { postId, userId }) =>
  fetchPostLikeGETStatusAndText(Constants, { postId, userId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchPostLikeGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['like', args], () => fetchPostLikeGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['likes']),
  })
}

export const FetchFetchPostLikeGET = ({ children, onData = () => {}, refetchInterval, postId, userId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchPostLikeGET({ postId, userId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchPostLike: refetch })
}

export const fetchPostLikeGETStatusAndTextCount = (Constants, { postId, userId }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/post_likes?post_id=eq.${postId ?? ''}`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchPostLikeGETCount = (Constants, { postId, userId }) =>
  fetchPostLikeGETStatusAndTextCount(Constants, { postId, userId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchPostLikeGETCount = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['like', args], () => fetchPostLikeGETCount(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['likes']),
  })
}

export const FetchFetchPostLikeGETCount = ({ children, onData = () => {}, refetchInterval, postId, userId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchPostLikeGETCount({ postId, userId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchPostLike: refetch })
}
export const fetchPostSaveGETStatusAndText = (Constants, { postId, userId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/post_saves?post_id=eq.${postId ?? ''}&select=*&user_id=eq.${
      userId ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchPostSaveGET = (Constants, { postId, userId }) =>
  fetchPostSaveGETStatusAndText(Constants, { postId, userId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchPostSaveGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['save', args], () => fetchPostSaveGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['saves']),
  })
}

export const FetchFetchPostSaveGET = ({ children, onData = () => {}, refetchInterval, postId, userId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchPostSaveGET({ postId, userId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchPostSave: refetch })
}

export const fetchRecommendedFanClubsGETStatusAndText = (Constants, { userId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclubs?fanclub_followers.user_id=eq.${
      userId ?? ''
    }&select=*,teams(*),fanclub_followers(fanclub_id)`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchRecommendedFanClubsGET = (Constants, { userId }) =>
  fetchRecommendedFanClubsGETStatusAndText(Constants, { userId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchRecommendedFanClubsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['fanclubs', args], () => fetchRecommendedFanClubsGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchRecommendedFanClubsGET = ({ children, onData = () => {}, refetchInterval, userId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchRecommendedFanClubsGET({ userId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchRecommendedFanClubs: refetch,
  })
}

export const fetchSingleFanClubGETStatusAndText = (Constants, { id }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclubs?id=eq.${id ?? ''}&select=*,teams(*)`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchSingleFanClubGET = (Constants, { id }) =>
  fetchSingleFanClubGETStatusAndText(Constants, { id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchSingleFanClubGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['fanclub', args], () => fetchSingleFanClubGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['fanclubs']),
  })
}

export const FetchFetchSingleFanClubGET = ({ children, onData = () => {}, refetchInterval, id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchSingleFanClubGET({ id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchSingleFanClub: refetch })
}

export const fetchSingleFanClubFollowsGETStatusAndText = (Constants, { fanclubId, userId }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclub_followers?fanclub_id=eq.${fanclubId ?? ''}`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchSingleFanClubFollowsGET = (Constants, { fanclubId, userId }) =>
  fetchSingleFanClubFollowsGETStatusAndText(Constants, {
    fanclubId,
    userId,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchSingleFanClubFollowsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['fanclubfollow', args], () => fetchSingleFanClubFollowsGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['fanclubfollows']),
  })
}

export const FetchFetchSingleFanClubFollowsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  fanclubId,
  userId,
}) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchSingleFanClubFollowsGET({ fanclubId, userId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchSingleFanClubFollows: refetch,
  })
}

export const fetchSingleFollowGETStatusAndText = (Constants, { followeeId, followerId }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/follows?followee_id=eq.${followeeId ?? ''}&select=*`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchSingleFollowGET = (Constants, { followeeId, followerId }) =>
  fetchSingleFollowGETStatusAndText(Constants, { followeeId, followerId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchSingleFollowGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['follow', args], () => fetchSingleFollowGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['follows']),
  })
}

export const FetchFetchSingleFollowGET = ({ children, onData = () => {}, refetchInterval, followeeId, followerId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchSingleFollowGET({ followeeId, followerId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchSingleFollow: refetch })
}

export const fetchSingleMatchGETStatusAndText = (Constants, { id }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/matches?id=eq.${id ?? ''}&select=*,team_1(*),team_2(*)`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchSingleMatchGET = (Constants, { id }) =>
  fetchSingleMatchGETStatusAndText(Constants, { id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchSingleMatchGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['match', args], () => fetchSingleMatchGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['matches']),
  })
}

export const FetchFetchSingleMatchGET = ({ children, onData = () => {}, refetchInterval, id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchSingleMatchGET({ id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchSingleMatch: refetch })
}

export const fetchSinglePostGETStatusAndText = (Constants, { id }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/posts?id=eq.${
      id ?? ''
    }&select=*,user_profiles!posts_posted_by_id_fkey(*)`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchSinglePostGET = (Constants, { id }) =>
  fetchSinglePostGETStatusAndText(Constants, { id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchSinglePostGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['post', args], () => fetchSinglePostGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })
}

export const FetchFetchSinglePostGET = ({ children, onData = () => {}, refetchInterval, id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchSinglePostGET({ id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchSinglePost: refetch })
}

export const fetchSinglePostWithNext10PostsGETStatusAndText = (
  Constants,
  { id }
) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/posts?id=lte.${
      id ?? ''
    }&limit=10&order=id.desc&select=*,user_profiles!posts_posted_by_id_fkey(*)`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const fetchSinglePostWithNext10PostsGET = (Constants, { id }) =>
  fetchSinglePostWithNext10PostsGETStatusAndText(Constants, { id }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useFetchSinglePostWithNext10PostsGET = (
  args,
  { refetchInterval } = {}
) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['posts', args],
    () => fetchSinglePostWithNext10PostsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchFetchSinglePostWithNext10PostsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } =
    useFetchSinglePostWithNext10PostsGET({ id }, { refetchInterval });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({
    loading,
    data,
    error,
    refetchFetchSinglePostWithNext10Posts: refetch,
  });
};

export const fetchSingleUserGETStatusAndText = (Constants, { id }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/user_profiles?user_id=eq.${id ?? ''}`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchSingleUserGET = (Constants, { id }) =>
  fetchSingleUserGETStatusAndText(Constants, { id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchSingleUserGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['user', args], () => fetchSingleUserGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['users']),
  })
}

export const FetchFetchSingleUserGET = ({ children, onData = () => {}, refetchInterval, id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchSingleUserGET({ id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchSingleUser: refetch })
}

export const fetchUserOnboardingStatusGETStatusAndText = (Constants, { id }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/user_profiles?select=onboarded&user_id=eq.${id ?? ''}`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchUserOnboardingStatusGET = (Constants, { id }) =>
  fetchUserOnboardingStatusGETStatusAndText(Constants, { id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchUserOnboardingStatusGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  const queryClient = useQueryClient()
  return useQuery(['user', args], () => fetchUserOnboardingStatusGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['users']),
  })
}

export const FetchFetchUserOnboardingStatusGET = ({ children, onData = () => {}, refetchInterval, id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchUserOnboardingStatusGET({ id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({
    loading,
    data,
    error,
    refetchFetchUserOnboardingStatus: refetch,
  })
}

export const fetchMatchMomentsGETStatusAndText = (Constants, { matchId }) =>
  fetch(
    `https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/match_moments?match_id=eq.${
      matchId ?? ''
    }&order=created_at.desc&select=*`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: Constants['AUTHORIZATION_HEADER'],
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
    },
  ).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchMatchMomentsGET = (Constants, { matchId }) =>
  fetchMatchMomentsGETStatusAndText(Constants, { matchId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchMatchMomentsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['moments', args], () => fetchMatchMomentsGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchMatchMomentsGET = ({ children, onData = () => {}, refetchInterval, matchId }) => {
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchMatchMomentsGET({ matchId }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchMatchMoments: refetch })
}

export const loginPOSTStatusAndText = (Constants, { loginEmail, loginPassword }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/token?grant_type=password', {
    body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const loginPOST = (Constants, { loginEmail, loginPassword }) =>
  loginPOSTStatusAndText(Constants, { loginEmail, loginPassword }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useLoginPOST = ({ loginEmail, loginPassword }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()

  return useFetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/token?grant_type=password', {
    body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  })
}

export const FetchLoginPOST = ({ children, onData = () => {}, refetchInterval, loginEmail, loginPassword }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const refetch = () => {}
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/token?grant_type=password', {
    body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchLogin: refetch })
}

export const loginViaEmailOTPPOSTStatusAndText = (Constants, { emailId, otp }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/verify', {
    body: JSON.stringify({ type: 'magiclink', email: emailId, token: otp }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const loginViaEmailOTPPOST = (Constants, { emailId, otp }) =>
  loginViaEmailOTPPOSTStatusAndText(Constants, { emailId, otp }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useLoginViaEmailOTPPOST = ({ emailId, otp }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()

  return useFetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/verify', {
    body: JSON.stringify({ type: 'magiclink', email: emailId, token: otp }),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  })
}

export const FetchLoginViaEmailOTPPOST = ({ children, onData = () => {}, refetchInterval, emailId, otp }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const refetch = () => {}
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/verify', {
    body: JSON.stringify({ type: 'magiclink', email: emailId, token: otp }),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchLoginViaEmailOTP: refetch })
}

export const signupPOSTStatusAndText = (Constants, { signupEmail, signupPassword }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/signup', {
    body: JSON.stringify({ email: signupEmail, password: signupPassword }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const signupPOST = (Constants, { signupEmail, signupPassword }) =>
  signupPOSTStatusAndText(Constants, { signupEmail, signupPassword }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useSignupPOST = ({ signupEmail, signupPassword }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()

  return useFetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/signup', {
    body: JSON.stringify({ email: signupEmail, password: signupPassword }),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  })
}

export const FetchSignupPOST = ({ children, onData = () => {}, refetchInterval, signupEmail, signupPassword }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const refetch = () => {}
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/signup', {
    body: JSON.stringify({ email: signupEmail, password: signupPassword }),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchSignup: refetch })
}

export const signupWithMailOTPPOSTStatusAndText = (Constants, { emailId }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/otp', {
    body: JSON.stringify({ email: emailId, create_user: true }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const signupWithMailOTPPOST = (Constants, { emailId }) =>
  signupWithMailOTPPOSTStatusAndText(Constants, { emailId }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useSignupWithMailOTPPOST = ({ emailId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()

  return useFetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/otp', {
    body: JSON.stringify({ email: emailId, create_user: true }),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  })
}

export const FetchSignupWithMailOTPPOST = ({ children, onData = () => {}, refetchInterval, emailId }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const refetch = () => {}
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch('https://pvbtcdjiibcaleqjdrih.supabase.co/auth/v1/otp', {
    body: JSON.stringify({ email: emailId, create_user: true }),
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchSignupWithMailOTP: refetch })
}

export const tagPostToFanClubPOSTStatusAndText = (Constants, { fanclub_id, post_id }) =>
  fetch('https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/fanclub_posts', {
    body: JSON.stringify({ fanclub_id: fanclub_id, post_id: post_id }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const tagPostToFanClubPOST = (Constants, { fanclub_id, post_id }) =>
  tagPostToFanClubPOSTStatusAndText(Constants, { fanclub_id, post_id }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useTagPostToFanClubPOST = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => tagPostToFanClubPOST(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('posts', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('post')
      queryClient.invalidateQueries('posts')
    },
  })
}

export const FetchTagPostToFanClubPOST = ({ children, onData = () => {}, refetchInterval, fanclub_id, post_id }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useTagPostToFanClubPOST({ fanclub_id, post_id }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchTagPostToFanClub: refetch })
}

export const updateExpoTokenPATCHStatusAndText = (Constants, { expoToken, userId }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/user_profiles?user_id=eq.${userId ?? ''}`, {
    body: JSON.stringify({ notification_token: expoToken }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'PATCH',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const updateExpoTokenPATCH = (Constants, { expoToken, userId }) =>
  updateExpoTokenPATCHStatusAndText(Constants, { expoToken, userId }).then(({ status, statusText, text }) => {
    try {
      if (text) return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useUpdateExpoTokenPATCH = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => updateExpoTokenPATCH(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('expo-token', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('expo-token')
      queryClient.invalidateQueries('expo-tokens')
    },
  })
}

export const updatePostPATCHStatusAndText = (Constants, { postId, updatedCaption }) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/posts?id=eq.${postId ?? ''}`, {
    body: JSON.stringify({ caption: updatedCaption }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'PATCH',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const updatePostPATCH = (Constants, { postId, updatedCaption }) =>
  updatePostPATCHStatusAndText(Constants, { postId, updatedCaption }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useUpdatePostPATCH = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => updatePostPATCH(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('posts', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('post')
      queryClient.invalidateQueries('posts')
    },
  })
}

export const updateUserProfilePATCHStatusAndText = (
  Constants,
  { briefBio, firstName, imgUrl, lastName, userHandle, userId },
) =>
  fetch(`https://pvbtcdjiibcaleqjdrih.supabase.co/rest/v1/user_profiles?user_id=eq.${userId ?? ''}`, {
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      handle: userHandle,
      bio: briefBio,
      profile_image: imgUrl,
    }),
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTHORIZATION_HEADER'],
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'PATCH',
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const updateUserProfilePATCH = (Constants, { briefBio, firstName, imgUrl, lastName, userHandle, userId }) =>
  updateUserProfilePATCHStatusAndText(Constants, {
    briefBio,
    firstName,
    imgUrl,
    lastName,
    userHandle,
    userId,
  }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useUpdateUserProfilePATCH = (initialArgs) => {
  const queryClient = useQueryClient()
  const Constants = GlobalVariables.useValues()

  return useMutation((args) => updateUserProfilePATCH(Constants, { ...initialArgs, ...args }), {
    onError: (err, variables, { previousValue }) => {
      if (previousValue) {
        return queryClient.setQueryData('user_profile', previousValue)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('user_profile')
      queryClient.invalidateQueries('user_profiles')
    },
  })
}
