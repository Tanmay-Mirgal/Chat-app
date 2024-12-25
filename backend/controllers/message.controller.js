import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const SendMessageController= async (req, res) => {
    try {
        const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}
//Socket.io functionality 
		await conversation.save();
		await newMessage.save();

		return res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
		console.log(error);
        return res.status(500).json({ message: error.message });
		
    }
};

export const GetMessageController= async (req, res) => {
	try {
		const { id:userToChatId} = req.params;
		
		const senderId = req.user._id;
		console.log(userToChatId);
		console.log(senderId);

		const conversations = await Conversation.findOne({
			participants:{$all:[senderId,userToChatId]}
		}).populate("messages");//we dont want id soo we populate the messages from that ids

		if(!conversations){
			return res.status(404).json({message:"No conversation found"});
		}
		console.log(conversations.messages);

		return res.status(200).json(conversations.messages ); 
		} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

