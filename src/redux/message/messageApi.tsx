import apiSlice from "../api/apiSlice";

 
const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ leadId, messageType, content }) => {
        console.log('rtk got Payload:', { leadId, messageType, content });
        return {
          url: `/lead/conversation/${leadId}/messages`,
          method: 'POST',
          body: {
            messageType,
            content,
          },
        };
      },
      invalidatesTags: (result, error, { leadId }) => [
        { type: 'Conversation', id: leadId },
      ],
    }),
  }),
});

export const { useSendMessageMutation } = messageApi;
export default messageApi;
