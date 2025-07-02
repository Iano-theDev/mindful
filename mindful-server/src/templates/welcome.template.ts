const sendWelcomeMail = async (userEmail: string, userName: string) => {
    // logger.info("Inside send welcome mail")
    
    // HTML template with confetti and animations
    const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Mindful!</title>
            <style>
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(-100vh) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-20px);
                    }
                    60% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes pulse {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                @keyframes slideInFromTop {
                    0% {
                        transform: translateY(-50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    overflow-x: hidden;
                    position: relative;
                }

                .confetti {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    animation: confetti-fall 3s linear infinite;
                }

                .confetti:nth-child(1) { left: 10%; animation-delay: 0s; background: #f43f5e; }
                .confetti:nth-child(2) { left: 20%; animation-delay: 0.2s; background: #3b82f6; }
                .confetti:nth-child(3) { left: 30%; animation-delay: 0.4s; background: #10b981; }
                .confetti:nth-child(4) { left: 40%; animation-delay: 0.6s; background: #f59e0b; }
                .confetti:nth-child(5) { left: 50%; animation-delay: 0.8s; background: #8b5cf6; }
                .confetti:nth-child(6) { left: 60%; animation-delay: 1s; background: #ef4444; }
                .confetti:nth-child(7) { left: 70%; animation-delay: 1.2s; background: #06b6d4; }
                .confetti:nth-child(8) { left: 80%; animation-delay: 1.4s; background: #84cc16; }
                .confetti:nth-child(9) { left: 90%; animation-delay: 1.6s; background: #f97316; }
                .confetti:nth-child(10) { left: 15%; animation-delay: 1.8s; background: #ec4899; }

                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                    position: relative;
                    z-index: 10;
                    margin-top: 40px;
                    margin-bottom: 40px;
                }

                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 40px 30px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .header::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                    animation: pulse 4s ease-in-out infinite;
                }

                .welcome-badge {
                    display: inline-block;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 8px 20px;
                    border-radius: 50px;
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    animation: slideInFromTop 1s ease-out;
                }

                .main-title {
                    font-size: 48px;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 15px;
                    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    animation: bounce 2s ease-in-out;
                    position: relative;
                    z-index: 2;
                }

                .subtitle {
                    font-size: 18px;
                    color: rgba(255, 255, 255, 0.9);
                    font-weight: 300;
                    position: relative;
                    z-index: 2;
                }

                .content {
                    padding: 50px 40px;
                    text-align: center;
                }

                .greeting {
                    font-size: 24px;
                    color: #374151;
                    margin-bottom: 25px;
                    font-weight: 600;
                }

                .message {
                    font-size: 18px;
                    line-height: 1.8;
                    color: #6b7280;
                    margin-bottom: 40px;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .cta-section {
                    margin: 40px 0;
                }

                .cta-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 16px 40px;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                    animation: pulse 2s ease-in-out infinite;
                }

                .cta-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
                }

                .features {
                    display: flex;
                    justify-content: space-around;
                    margin: 50px 0;
                    flex-wrap: wrap;
                }

                .feature {
                    flex: 1;
                    min-width: 150px;
                    text-align: center;
                    padding: 20px;
                }

                .feature-icon {
                    font-size: 40px;
                    margin-bottom: 15px;
                    display: block;
                }

                .feature-title {
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 8px;
                    font-size: 16px;
                }

                .feature-desc {
                    color: #9ca3af;
                    font-size: 14px;
                }

                .footer {
                    background: #f8fafc;
                    padding: 30px 40px;
                    text-align: center;
                    border-top: 1px solid #e5e7eb;
                }

                .footer-text {
                    color: #9ca3af;
                    font-size: 14px;
                    line-height: 1.6;
                }

                .social-links {
                    margin: 20px 0;
                }

                .social-link {
                    display: inline-block;
                    margin: 0 10px;
                    padding: 10px;
                    background: #e5e7eb;
                    border-radius: 50%;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .social-link:hover {
                    background: #667eea;
                    transform: translateY(-2px);
                }

                .emoji {
                    font-size: 24px;
                    margin: 0 5px;
                }

                @media (max-width: 600px) {
                    .email-container {
                        margin: 20px;
                        border-radius: 16px;
                    }
                    
                    .main-title {
                        font-size: 36px;
                    }
                    
                    .content {
                        padding: 30px 25px;
                    }
                    
                    .features {
                        flex-direction: column;
                    }
                }
            </style>
        </head>
        <body>
            <!-- Confetti Animation -->
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>
            <div class="confetti"></div>

            <div class="email-container">
                <!-- Header Section -->
                <div class="header">
                    <div class="welcome-badge">🎉 NEW MEMBER</div>
                    <h1 class="main-title">Welcome!</h1>
                    <p class="subtitle">You're now part of something amazing</p>
                </div>

                <!-- Main Content -->
                <div class="content">
                    <h2 class="greeting">Hello ${userName}! <span class="emoji">👋</span></h2>
                    
                    <p class="message">
                        We're absolutely <strong>thrilled</strong> to have you join the Mindful community! 
                        You've just taken the first step towards a more mindful, intentional life, 
                        and we couldn't be more excited to be part of your journey.
                    </p>

                    <div class="cta-section">
                        <a href="#" class="cta-button">Start Your Journey <span class="emoji">✨</span></a>
                    </div>

                    <!-- Features Section -->
                    <div class="features">
                        <div class="feature">
                            <span class="feature-icon">🧘‍♀️</span>
                            <div class="feature-title">Guided Meditation</div>
                            <div class="feature-desc">Daily sessions to center your mind</div>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">📱</span>
                            <div class="feature-title">Mobile App</div>
                            <div class="feature-desc">Practice mindfulness anywhere</div>
                        </div>
                        <div class="feature">
                            <span class="feature-icon">👥</span>
                            <div class="feature-title">Community</div>
                            <div class="feature-desc">Connect with like-minded people</div>
                        </div>
                    </div>

                    <p class="message">
                        <span class="emoji">🌟</span> Ready to transform your daily routine into moments of peace and clarity? 
                        Let's begin this beautiful journey together!
                    </p>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <div class="social-links">
                        <a href="#" class="social-link">📧</a>
                        <a href="#" class="social-link">🐦</a>
                        <a href="#" class="social-link">📘</a>
                    </div>
                    <p class="footer-text">
                        Questions? We're here to help! Reply to this email or visit our help center.<br>
                        <strong>The Mindful Team</strong> <span class="emoji">💜</span>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;

    // Enhanced plain text version for email clients that don't support HTML
    const textVersion = `
🎉 Welcome to Mindful, ${userName}! By Ian🎉

We're absolutely thrilled to have you join our community!

You've just taken the first step towards a more mindful, intentional life, and we couldn't be more excited to be part of your journey.

What you can expect:
🧘‍♀️ Guided Meditation - Daily sessions to center your mind
📱 Mobile App - Practice mindfulness anywhere
👥 Community - Connect with like-minded people

Ready to transform your daily routine into moments of peace and clarity? Let's begin this beautiful journey together!

Questions? We're here to help! Reply to this email or visit our help center.

With love,
The Mindful Team 💚
    `;

    // const mailOptions = {
    //     from: config.mindful_mail,
    //     to: userEmail,
    //     subject: "🎉 Welcome to Mindful - Your Journey Begins Now!",
    //     text: textVersion,
    //     html: htmlTemplate
    // }
    
    // logger.info("mailOptions are: ", mailOptions)
    
    // try {
    //     let info = await this.transporter.sendMail(mailOptions)
    //     logger.info("Mail sent info is: ", info)
    //     return info
    // } catch (error) {
    //     logger.info("An error occurred: ", error)
    //     throw error
    // }
}