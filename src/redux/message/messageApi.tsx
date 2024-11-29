// import apiSlice from "../api/apiSlice";

// const messageApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     sendMessage: builder.mutation({
//       query: ({ leadId, messageType, content }) => {
//         console.log('rtk got Payload:', { leadId, messageType, content });
//         return {
//           url: `/lead/conversation/${leadId}/messages`,
//           method: 'POST',
//           body: {
//             messageType,
//             content,
//           },
//         };
//       },
//       invalidatesTags: (result, error, { leadId }) => [
//         { type: 'Conversation', id: leadId },
//       ],
//     }),
//   }),
// });

// export const { useSendMessageMutation } = messageApi;
// export default messageApi;












import apiSlice from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing text message mutation
    sendMessage: builder.mutation({
      query: ({ leadId, messageType, content }) => ({
        url: `/lead/conversation/${leadId}/messages`,
        method: 'POST',
        body: {
          messageType,
          content,
        },
      }),
      invalidatesTags: (result, error, { leadId }) => [
        { type: 'Conversation', id: leadId },
      ],
    }),
    
    // New mutation for file upload
    sendFileMessage: builder.mutation({
      query: ({ leadId, file }) => {
        // Use external file upload service like Cloudinary or Firebase
        return {
          url: `/lead/conversation/${leadId}/messages`,
          method: 'POST',
          body: {
            messageType: file.type.split('/')[0], // image/jpeg -> image
            content: {
              urls: [file.cloudinaryUrl] // URL from cloud storage
            },
          },
        };
      },
      invalidatesTags: (result, error, { leadId }) => [
        { type: 'Conversation', id: leadId },
      ],
    }),
  }),
});

export const { 
  useSendMessageMutation, 
  useSendFileMessageMutation 
} = messageApi;
export default messageApi;