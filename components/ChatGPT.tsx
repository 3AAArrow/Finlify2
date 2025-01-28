import React, { useState } from 'react';
import axios from 'axios';

const ChatGPT: React.FC = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { role: 'user', content: userInput }];
        setMessages(newMessages);

        setIsLoading(true); // เริ่มโหลดข้อมูล

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: newMessages.map((msg) => ({
                        role: msg.role,
                        content: msg.content,
                    })),
                    max_tokens: 100, // จำกัดจำนวน tokens ที่ตอบกลับ
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // ใช้ Environment Variable
                    },
                }
            );

            const botResponse = response.data.choices[0].message.content;
            setMessages([...newMessages, { role: 'assistant', content: botResponse }]);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Axios-specific error
                console.error('Axios Error:', error.response?.data || error.message);
            } else {
                // Unknown error
                console.error('Unexpected Error:', error);
            }
        } finally {
            setIsLoading(false); // หยุดโหลดข้อมูล
        }

        setUserInput(''); // เคลียร์ input
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center' }}>ChatGPT</h1>
            <div
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    height: '400px',
                    overflowY: 'auto',
                    marginBottom: '10px',
                }}
            >
                {messages.map((msg, index) => (
                    <p
                        key={index}
                        style={{
                            textAlign: msg.role === 'user' ? 'right' : 'left',
                            margin: '5px 0',
                            color: msg.role === 'user' ? 'blue' : 'green',
                        }}
                    >
                        <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
                    </p>
                ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginRight: '10px',
                    }}
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: isLoading ? '#ccc' : '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isLoading ? 'Loading...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default ChatGPT;
