-- portgresSQL.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- En CHECK-constraint på kolumnen type = säkerställa värde är en av de angivna te-types. Förhindra att andra värden infogas i denna kolumn.
CREATE TABLE teas (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    type VARCHAR(50) CHECK (type::text = ANY (ARRAY['Black tea', 'Green tea', 'Red tea', 'Yellow tea', 'Oolong tea', 'Herbal tea', 'White tea']::text[])),
    origin VARCHAR(100),
    description TEXT,
    properties TEXT,
    fragrance TEXT,
    history TEXT,
    how_to_brew TEXT
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT,
    tea_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (tea_id) REFERENCES teas(id),
    UNIQUE (user_id, tea_id)
);

-- Black Tea
INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Assam Tea', 'Black tea', 'Assam, India', 'Assam tea is a black tea named after the region of its production, Assam, India.', 'Rich in antioxidants, may promote heart health', 'Malts, Fruity, Floral', 'Assam tea is known for its robust flavor and is often used in breakfast teas.', 'Pour boiling water over tea leaves and steep for 3-5 minutes.');

INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Darjeeling Tea', 'Black tea', 'Darjeeling, India', 'Darjeeling tea is a black tea grown in the Darjeeling district of West Bengal, India.', 'Rich in antioxidants, may aid in digestion', 'Muscatel, Floral, Fruity', 'Darjeeling tea is often referred to as the "Champagne of teas" due to its unique flavor profile.', 'Steep the tea leaves in hot water for 2-3 minutes.');

-- Black Tea
INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Earl Grey', 'Black tea', 'Various', 'Earl Grey is a flavored black tea that is infused with oil from the rind of bergamot orange.', 'Rich in antioxidants, may improve digestion', 'Citrusy, Floral', 'Earl Grey tea is named after Charles Grey, the 2nd Earl Grey, who was Prime Minister of the United Kingdom in the 1830s.', 'Steep the tea leaves in hot water for 3-5 minutes.');

-- Green Tea
INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Sencha', 'Green tea', 'Japan', 'Sencha is a type of Japanese ryokucha which is prepared by infusing the processed whole tea leaves in hot water.', 'Rich in antioxidants, may boost metabolism', 'Grassy, Seaweed', 'Sencha is the most popular tea in Japan and is enjoyed for its refreshing taste.', 'Steep the tea leaves in water heated to around 70-80°C for 1-2 minutes.');

INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Dragon Well', 'Green tea', 'China', 'Dragon Well tea, also known as Longjing tea, is a famous variety of green tea from Hangzhou, Zhejiang Province, China.', 'Rich in antioxidants, may improve focus', 'Chestnut, Grassy, Sweet', 'Dragon Well tea has a history dating back to the Tang dynasty and is prized for its flat, smooth leaves.', 'Infuse the tea leaves in hot water (70-80°C) for about 2-3 minutes.');

-- Red Tea (Rooibos)
INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Rooibos', 'Red tea', 'South Africa', 'Rooibos, often referred to as red tea, is an herbal tea that comes from the fermented leaves of the Aspalathus linearis plant.', 'Caffeine-free, rich in antioxidants', 'Sweet, Nutty', 'Rooibos has been consumed in South Africa for centuries and is known for its sweet, nutty flavor.', 'Steep the tea in boiling water for 5-7 minutes.');

-- Yellow Tea
INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Junshan Yinzhen', 'Yellow tea', 'China', 'Junshan Yinzhen, also known as Junshan Silver Needle, is a rare and highly-prized yellow tea from Hunan Province, China.', 'Rich in antioxidants, may promote relaxation', 'Floral, Sweet, Mellow', 'Junshan Yinzhen is one of the top teas in China, known for its delicate flavor and unique production process.', 'Use water around 70-80°C and steep the tea for 2-3 minutes.');

-- Oolong Tea
INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Tieguanyin', 'Oolong tea', 'China', 'Tieguanyin, also known as Iron Goddess of Mercy, is a premium variety of Chinese oolong tea.', 'Rich in antioxidants, may aid in weight management', 'Floral, Fruity', 'Tieguanyin has a long history dating back to the Qing dynasty and is known for its complex flavors.', 'Use water around 85-95°C and steep the tea for 2-3 minutes.');

-- Herbal Tea
INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Chamomile Tea', 'Herbal tea', 'Various', 'Chamomile tea is a popular herbal tea made from the dried flowers of the chamomile plant.', 'Promotes sleep, soothes digestion', 'Floral, Apple-like', 'Chamomile tea has been used for centuries for its calming effects and mild flavor.', 'Steep the tea in hot water (90-95°C) for about 5 minutes.');

INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Peppermint Tea', 'Herbal tea', 'Various', 'Peppermint tea is a type of herbal tea made from dried peppermint leaves.', 'Promotes digestion, freshens breath', 'Cooling, Minty', 'Peppermint tea is known for its refreshing taste and health benefits.', 'Steep the tea in boiling water for 3-5 minutes.');

INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Lavender Tea', 'Herbal tea', 'Various', 'Lavender tea is an herbal tea made from the dried flowers of the lavender plant.', 'Calming, promotes relaxation', 'Floral, Sweet', 'Lavender tea is known for its soothing aroma and relaxing properties.', 'Steep the tea in hot water (90-95°C) for about 5 minutes.');

-- White Tea
INSERT INTO teas (title, type, origin, description, properties, fragrance, history, how_to_brew)
VALUES ('Silver Needle', 'White tea', 'China', 'Silver Needle, also known as Baihao Yinzhen, is a high-quality Chinese white tea made from the young buds of the tea plant.', 'Rich in antioxidants, promotes healthy skin', 'Delicate, Floral', 'Silver Needle is considered one of the finest white teas and is prized for its subtle flavor and aroma.', 'Use water around 70-80°C and steep the tea for 2-3 minutes.');
