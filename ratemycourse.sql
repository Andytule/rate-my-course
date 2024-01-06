-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2024 at 09:16 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ratemycourse`
--

-- --------------------------------------------------------

--
-- Table structure for table `course_reviews`
--

CREATE TABLE `course_reviews` (
  `id` int(11) NOT NULL,
  `course_name` text NOT NULL,
  `course_code` text NOT NULL,
  `term` text NOT NULL,
  `level` text NOT NULL,
  `rating` int(11) NOT NULL,
  `school_name` text NOT NULL,
  `comments` text NOT NULL,
  `tips_and_tricks` text NOT NULL,
  `creator_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_reviews`
--

INSERT INTO `course_reviews` (`id`, `course_name`, `course_code`, `term`, `level`, `rating`, `school_name`, `comments`, `tips_and_tricks`, `creator_id`) VALUES
(30, 'Intro to Youtube Content Creation', 'Youtube102', 'Winter 2023', 'Other', 7, 'Google Courses', 'Very fun course to try dive in to content creation', 'You only need a phone with a camera. Nothing more!', 1),
(33, 'Sony Camera Lessons', 'Sony-CAM-101', 'Fall 2022', 'College', 3, 'SampleSchool', 'SampleComments', 'SampleTips', 1),
(44, 'Introduction to Programming', 'CS101', 'Fall 2023', 'Undergraduate', 9, 'University of ABC', 'The course was challenging but rewarding.', 'Practice coding regularly and seek help when needed.', 1),
(45, 'Web Development Basics', 'WEB101', 'Spring 2023', 'Undergraduate', 8, 'Tech Institute', 'Enjoyed building websites in this course.', 'Learn about the latest web development frameworks.', 3),
(47, 'Software Engineering Principles', 'SE301', 'Summer 2023', 'Undergraduate', 7, 'Engineering College', 'Learned about software development lifecycle.', 'Collaborate with team members effectively.', 6),
(48, 'Digital Marketing Strategies', 'MARK202', 'Fall 2023', 'Undergraduate', 9, 'Business School', 'Applied marketing concepts to digital platforms.', 'Stay updated on the latest marketing trends.', 8),
(49, 'Statistics for Data Science', 'STAT301', 'Spring 2023', 'Graduate', 8, 'Data Science Institute', 'Used statistical methods for data analysis.', 'Practice statistical programming with real datasets.', 1),
(50, 'Artificial Intelligence and Machine Learning', 'AI404', 'Winter 2023', 'Graduate', 10, 'AI Research Institute', 'Cutting-edge topics in AI and ML.', 'Implement machine learning models from scratch.', 5),
(51, 'Business Ethics and Social Responsibility', 'ETHICS101', 'Summer 2023', 'Undergraduate', 7, 'Business Ethics College', 'Explored ethical considerations in business.', 'Integrate ethical practices in business decisions.', 7),
(52, 'Human-Computer Interaction', 'HCI303', 'Fall 2023', 'Graduate', 9, 'HCI Research Center', 'Designed user-friendly interfaces.', 'Conduct usability testing for software applications.', 8),
(53, 'Environmental Science and Sustainability', 'ENVSCI201', 'Spring 2023', 'Undergraduate', 8, 'Environmental Science University', 'Explored environmental issues and sustainability.', 'Promote eco-friendly practices in everyday life.', 6),
(54, 'Data Structures and Algorithms', 'DSA202', 'Winter 2023', 'College', 10, 'Computer Science University', 'Fantastic course with in-depth coverage of algorithms.', 'Master data structures for coding interviews.', 1),
(55, 'PHP Introduction', 'PHP-101', 'Winter 2024', 'College', 8, 'University of British Columbia', 'This is a really great course despite the fact that PHP is not too popular nowadays for backend development.', 'Class lectures are not as important as practical application through the quizes and the assignments.', 1),
(60, 'Audio Tech Support', 'AUD-101', 'Winter 2022', 'College', 8, 'Sony Studios', 'Great course if you want to be come an audio technician or a sound engineer.', 'Buy really nice and expensive headphones :)', 1),
(61, 'KPOP History', 'KPOP-102', 'Fall 2023', 'University', 7, 'University of Soeul', 'Great Course. I hope you really like korean culture if you are taking this course, because there will be a lot of that.', 'Watch a lot of youtube videos on kpop/korean culture!', 1),
(62, 'Data Visualization with Python', 'DV101', 'Spring 2023', 'Undergraduate', 8, 'Analytics Institute', 'Engaging course with practical projects.', 'Use Matplotlib and Seaborn for effective visualizations.', 3),
(63, 'Mobile App Development', 'APPDEV202', 'Fall 2022', 'Graduate', 9, 'Tech Innovators College', 'Learned to create feature-rich mobile apps.', 'Focus on user experience and test on real devices.', 5),
(64, 'Entrepreneurship and Innovation', 'ENTR101', 'Summer 2023', 'Undergraduate', 7, 'Startup University', 'Explored the startup ecosystem and business strategies.', 'Network with entrepreneurs and build a strong pitch.', 7),
(65, 'Advanced Database Management', 'DBM401', 'Winter 2023', 'Graduate', 9, 'Database Research Institute', 'In-depth study of advanced database concepts.', 'Implement database normalization techniques.', 6),
(66, 'Digital Art and Design', 'ARTD101', 'Spring 2023', 'College', 8, 'Creative Arts Academy', 'Express creativity through digital art.', 'Experiment with Adobe Creative Suite tools.', 8),
(67, 'Cryptocurrency and Blockchain Technology', 'BLOCKCHAIN201', 'Fall 2023', 'Graduate', 10, 'Blockchain Institute', 'Cutting-edge topics in blockchain and decentralized finance.', 'Explore smart contract development with Ethereum.', 1),
(68, 'Human Physiology', 'PHYSIOLOGY301', 'Summer 2022', 'Undergraduate', 8, 'Medical Sciences University', 'Studied the intricacies of human physiology.', 'Join study groups for better understanding of complex topics.', 5),
(69, 'Digital Photography Techniques', 'PHOTO101', 'Winter 2024', 'College', 7, 'Photography School', 'Learned essential photography techniques.', 'Experiment with manual camera settings for better control.', 1),
(70, 'Cybersecurity Fundamentals', 'SEC101', 'Fall 2022', 'Undergraduate', 9, 'Cybersecurity Institute', 'Explored key concepts in cybersecurity.', 'Stay updated on the latest security threats and countermeasures.', 3),
(71, 'Public Speaking and Communication Skills', 'COMM202', 'Spring 2023', 'Undergraduate', 8, 'Communication College', 'Developed effective public speaking skills.', 'Practice in front of a mirror and seek constructive feedback.', 8),
(72, 'Introduction to Machine Vision', 'VISION101', 'Winter 2023', 'Graduate', 9, 'Vision Research Institute', 'Explored applications of machine vision in various industries.', 'Hands-on projects are crucial for understanding complex concepts.', 6),
(73, 'Social Media Marketing Strategies', 'SOCMKTG202', 'Fall 2023', 'Undergraduate', 8, 'Marketing Academy', 'Applied marketing principles to social media platforms.', 'Create a content calendar and engage with the audience.', 7),
(74, 'Digital Storytelling and Narrative Design', 'STORY101', 'Spring 2022', 'College', 7, 'Storytelling Institute', 'Explored the art of digital storytelling.', 'Craft compelling narratives with a clear story arc.', 1),
(75, 'Quantum Computing Fundamentals', 'QUANTUM301', 'Summer 2023', 'Graduate', 10, 'Quantum Computing Center', 'Dived into the world of quantum computing.', 'Understand quantum gates and algorithms for practical applications.', 5),
(76, 'Brand Management and Strategy', 'BRAND202', 'Winter 2024', 'Undergraduate', 8, 'Business School', 'Explored brand building and strategic management.', 'Consistency is key in building and maintaining a strong brand.', 8),
(77, 'Robotics Engineering Principles', 'ROBOTICS303', 'Fall 2022', 'Undergraduate', 9, 'Engineering College', 'Learned about the principles of robotics and automation.', 'Hands-on projects enhance understanding of theoretical concepts.', 6),
(78, 'Digital Health and Telemedicine', 'HEALTHTECH101', 'Spring 2023', 'Graduate', 8, 'Health Sciences University', 'Explored the intersection of technology and healthcare.', 'Understand the legal and ethical considerations in telemedicine.', 1),
(79, 'Introduction to Virtual Reality', 'VR101', 'Fall 2023', 'Undergraduate', 7, 'Virtual Reality Institute', 'Dived into the basics of virtual reality technology.', 'Create immersive experiences with VR development tools.', 3),
(80, 'Game Design and Development', 'GAMEDEV202', 'Winter 2023', 'College', 9, 'Game Development Academy', 'Explored the entire game development process.', 'Iterate on game design and gather feedback from playtesting.', 8),
(81, 'Supply Chain Management Strategies', 'SUPPLYCHAIN301', 'Summer 2023', 'Graduate', 8, 'Business Logistics Institute', 'Studied effective strategies for supply chain management.', 'Implement data-driven decision-making in logistics.', 7),
(82, 'Astrobiology: Life Beyond Earth', 'ASTROBIO101', 'Fall 2023', 'Undergraduate', 9, 'Exoplanetary University', 'Explored the possibilities of extraterrestrial life.', 'Stay curious and follow recent discoveries in astrobiology.', 5),
(83, 'Culinary Arts and Gastronomy', 'CHEF101', 'Spring 2022', 'College', 8, 'Gourmet Institute', 'Learned the art and science of culinary creativity.', 'Experiment with flavors and presentation for unique dishes.', 7),
(84, 'Fashion Design and Sustainable Apparel', 'FASHION202', 'Winter 2024', 'Undergraduate', 9, 'Fashion Innovation School', 'Explored sustainable practices in the fashion industry.', 'Incorporate eco-friendly materials into your designs.', 8),
(85, 'Space Tourism: The Future Frontier', 'SPACETOURISM303', 'Summer 2023', 'Graduate', 10, 'Space Exploration Academy', 'Dived into the emerging field of space tourism.', 'Stay informed about advancements in space travel technology.', 1),
(86, 'Psychology of Creativity and Innovation', 'PSYCHCREATIVITY301', 'Fall 2022', 'Graduate', 8, 'Mind Sciences Institute', 'Explored the psychological aspects of creativity.', 'Practice mindfulness and diverse thinking for enhanced innovation.', 6),
(87, 'Ethical Hacking and Cybersecurity', 'ETHICALHACK101', 'Winter 2023', 'Undergraduate', 9, 'Cybersecurity Academy', 'Learned ethical hacking techniques for cybersecurity.', 'Constantly practice and stay updated on the latest hacking trends.', 3),
(88, 'Adventure Filmmaking and Cinematography', 'ADVENTUREFILM101', 'Spring 2023', 'College', 7, 'Film and Media Institute', 'Explored the challenges of filmmaking in adventurous settings.', 'Master aerial cinematography for breathtaking shots.', 7),
(89, 'Mind-Body Wellness and Holistic Health', 'WELLNESS202', 'Summer 2023', 'Undergraduate', 8, 'Wellness and Healing College', 'Explored holistic approaches to health and well-being.', 'Incorporate mindfulness practices into your daily routine.', 8),
(90, 'Space Archaeology: Unearthing Cosmic Mysteries', 'SPACEARCH101', 'Fall 2023', 'Graduate', 9, 'Archaeo-Astronomy Research Center', 'Dived into the intersection of archaeology and astronomy.', 'Use satellite imaging for archaeological discoveries.', 5),
(91, 'Artificial Intelligence in Art and Music', 'AIARTMUSIC303', 'Winter 2023', 'Graduate', 10, 'AI and Arts Institute', 'Explored the fusion of artificial intelligence with creative arts.', 'Experiment with AI-generated art and music compositions.', 6);

-- --------------------------------------------------------

--
-- Table structure for table `forum_posts`
--

CREATE TABLE `forum_posts` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `account` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forum_posts`
--

INSERT INTO `forum_posts` (`id`, `content`, `date`, `account`, `parent_id`) VALUES
(1, 'Welcome to our new website for rating courses! We are excited to provide a platform for students to share their experiences and insights about various courses.', '2023-10-15 04:00:00', 1, NULL),
(2, 'I find this platform very useful for discovering new courses and reading reviews from other students. It makes course selection much easier.', '2023-10-16 04:00:00', 3, 1),
(3, 'Agreed! It\'s great to see reviews and ratings for courses. I hope more students join and share their thoughts.', '2023-10-17 04:00:00', 3, 1),
(4, 'I recently used this website to find a course, and the reviews were spot on! I had a great experience thanks to the recommendations.', '2023-10-18 04:00:00', 5, NULL),
(5, 'I noticed that the website\'s user interface is user-friendly. The search and filter options make it easy to find courses of interest.', '2023-10-19 04:00:00', 6, 4),
(6, 'The course rating feature is a game-changer. It helps me prioritize courses based on student feedback.', '2023-10-20 04:00:00', 6, 4),
(7, 'Feel free to start discussions, ask questions, and share your experiences. We\'re here to build a community of course enthusiasts!', '2023-10-21 04:00:00', 1, NULL),
(14, 'Hey, everyone! I\'m currently a student at UOFT studying engineering, and I\'ve been thinking about the future of engineering education at our university. With all the advancements in technology and the changing needs of the industry, how can UOFT better prepare engineering students for the challenges of the future?', '2023-11-05 21:54:50', 1, NULL),
(15, 'Hey there, fellow UofT student! 🍁 It\'s quite a topic to chat about, especially here in Toronto, where the weather is as unpredictable as our exam schedules, right? 😄 I hope you\'re staying warm and cozy during these chilly winter months, and if you\'re a fan of snow, I bet you\'re enjoying the beautiful winter wonderland. But if you\'re like me and can\'t wait for the warmer days, we can always dream of sunny afternoons in King\'s College Circle or the beauty of the UofT campuses in full bloom during spring. So, speaking of random stuff, what\'s your go-to place around UofT for a quick bite or a study break? Do you have any favorite campus spots to relax or some fun memories to share? Let\'s make this conversation as diverse as our university experiences! 😊', '2023-11-05 23:34:04', 1, 14),
(21, 'Testing', '2023-11-06 00:34:33', 1, NULL),
(51, 'I totally agree! This platform has been a game-changer for my course selection.', '2023-10-17 08:30:00', 5, 2),
(52, 'The reviews here helped me choose the right courses. Kudos to the community!', '2023-10-18 09:15:00', 6, 2),
(53, 'I discovered a hidden gem of a course through the recommendations here.', '2023-10-19 10:00:00', 7, 2),
(54, 'The user-friendly interface makes this platform my go-to for course information.', '2023-10-20 11:45:00', 8, 2),
(55, 'I had a similar positive experience with the reviews on this website.', '2023-10-19 09:00:00', 1, 4),
(56, 'The course rating system is indeed helpful for making informed decisions.', '2023-10-20 10:30:00', 3, 4),
(57, 'I recommend checking out the discussion forum for more insights!', '2023-10-21 12:00:00', 5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_id` int(11) NOT NULL,
  `school_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`school_id`, `school_name`) VALUES
(1, 'Mohawk College');

-- --------------------------------------------------------

--
-- Table structure for table `survey_responses`
--

CREATE TABLE `survey_responses` (
  `id` int(11) NOT NULL,
  `satisfaction` int(11) NOT NULL,
  `improvements` text NOT NULL,
  `comments` text NOT NULL,
  `anonymous` tinyint(1) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `checked` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `survey_responses`
--

INSERT INTO `survey_responses` (`id`, `satisfaction`, `improvements`, `comments`, `anonymous`, `user_id`, `checked`) VALUES
(1, 5, 'everything', 'it was okay otherwise....', 1, NULL, 0),
(5, 5, 'Alot', 'Something cool would be nice', 1, NULL, 0),
(7, 4, 'This app needs more color', 'Please give us more schools', 0, 1, 0),
(8, 4, 'This app needs more color and I think the text can be bigger', 'Please give us more schools, more courses. and better sorting functionality.', 0, 1, 0),
(9, 2, 'this app needs alot of improvement', 'Nothing....', 0, 1, 0),
(10, 5, 'This app is amazing', 'Can you make the app for mobile?', 0, 1, 0),
(11, 4, 'There is a lot we can improve. Like for example the heading of the satisfied drop down name is kind\'ve messed up and I would love if you fix that.', 'This page needs a mobile app :)', 0, 1, 0),
(12, 5, 'The error mentioned in the code is related to the absence of a function named showToastError. It\'s not recognized in the current context, resulting in a TypeScript error. The code is attempting to call this function when an error occurs, displaying an error message in a toast notification. However, showToastError is not defined, leading to the TypeScript error. To resolve this issue, you need to define or import the showToastError function properly or use an appropriate method to display error messages.', 'Can I have more customization on my profile?', 0, 1, 0),
(13, 3, 'More interactive content needed', 'The course materials could be more engaging.', 1, NULL, 0),
(14, 4, 'Better navigation for the app', 'Some features are hard to find.', 0, 3, 0),
(15, 5, 'No improvements needed, excellent course!', 'I thoroughly enjoyed the course content.', 0, 5, 0),
(16, 2, 'Provide more real-world examples', 'The course lacks practical application.', 1, NULL, 0),
(17, 4, 'Improve course scheduling', 'Scheduling conflicts were challenging to manage.', 0, 6, 0),
(18, 3, 'Enhance user interface design', 'The website navigation is a bit confusing.', 0, 7, 0),
(19, 5, 'Great course, no suggestions', 'The instructor was fantastic!', 1, NULL, 0),
(20, 4, 'Add more practice quizzes', 'More quizzes would help reinforce learning.', 0, 8, 0),
(21, 3, 'Include more hands-on projects', 'Hands-on projects would make the course more practical.', 1, NULL, 0),
(22, 5, 'Excellent course content', 'The course met all my expectations.', 0, 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `role_id`) VALUES
(1, 'aGl0eI66', 'andy.le3@mohawkcollege.ca', 2),
(3, 'aGl0eI66', 'andy.le4@mohawkcollege.ca', 1),
(5, 'password', 'testuser@gmail.com', 1),
(6, 'password', 'newUser@gmail.com', 1),
(7, '1234', 'testemail@gmail.com', 1),
(8, 'testing', 'newaccount@gmail.com', 1),
(9, 'student123', 'student1@example.com', 1),
(10, 'pass123', 'student2@example.com', 1),
(11, 'studyHard', 'student3@example.com', 1),
(12, 'learning123', 'student4@example.com', 1),
(13, 'examTime', 'student5@example.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`role_id`, `role_name`) VALUES
(1, 'Student'),
(2, 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course_reviews`
--
ALTER TABLE `course_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator_id` (`creator_id`);

--
-- Indexes for table `forum_posts`
--
ALTER TABLE `forum_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_user_id` (`account`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`school_id`);

--
-- Indexes for table `survey_responses`
--
ALTER TABLE `survey_responses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course_reviews`
--
ALTER TABLE `course_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `forum_posts`
--
ALTER TABLE `forum_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `school_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `survey_responses`
--
ALTER TABLE `survey_responses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course_reviews`
--
ALTER TABLE `course_reviews`
  ADD CONSTRAINT `course_reviews_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `forum_posts`
--
ALTER TABLE `forum_posts`
  ADD CONSTRAINT `post_user_id` FOREIGN KEY (`account`) REFERENCES `users` (`id`);

--
-- Constraints for table `survey_responses`
--
ALTER TABLE `survey_responses`
  ADD CONSTRAINT `survey_responses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
