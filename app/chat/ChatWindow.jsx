import { useState } from 'react';

function ChatWindow({ chatId, messages, onSendMessage, isTyping, setIsTyping }) {
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for sending messages

    const handleSend = async () => {
        if (newMessage.trim()) {
            setLoading(true); // Simulate loading while message is being sent
            onSendMessage(chatId, newMessage);
            setNewMessage(''); // Clear the input field
            setLoading(false);
        }
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false); // Simulate "typing stopped" after a brief delay
        }, 1000);
    };

    return (
        <div className="w-3/4 flex flex-col">
            <div className="flex-1 p-4 overflow-y-scroll bg-zinc-50">
                {messages.map((message, index) => (
                    <div key={index} className="mb-4 flex">
                        <strong>{message.sender}</strong> <p className='ml-4'>{message.text}</p>
                    </div>
                ))}
                {isTyping && <div className="text-zinc-500 italic">User is typing...</div>}
            </div>

            <div className="p-4 border-t bg-zinc-50 fixed bottom-0 w-2/4 justify-center flex flex-col">
                <input
                    type="text"
                    value={newMessage}
                    onChange={handleTyping}
                    className="w-full p-2 border rounded"
                    placeholder="Type your message..."
                    disabled={loading}
                />
                <button
                    onClick={handleSend}
                    className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
