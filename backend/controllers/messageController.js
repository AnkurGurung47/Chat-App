import { Conversation } from '../models/convoModel.js'
import { Message } from '../models/msgModel.js'
import { getReceiverSocketId, io } from '../socket/socket.js'
export const sendMsg = async (req, res) => {
  try {
    const senderId = req.id
    const receiverId = req.params.id
    const { message } = req.body

    //from Chatgpt
    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    //continue course
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      })
    }
    const newMsg = await Message.create({
      senderId,
      receiverId,
      message,
    })
    if (newMsg) {
      gotConversation.messages.push(newMsg._id)
    }

    await gotConversation.save()

    //socketIo
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMsg)
    }

    return res.status(200).json({
      message: newMsg,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
}

export const getMsg = async (req, res) => {
  try {
    const senderId = req.id
    const receiverId = req.params.id

    const getConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate('messages')
    return res.status(200).json(getConversation?.messages)
  } catch (error) {
    console.log(error)
  }
}
