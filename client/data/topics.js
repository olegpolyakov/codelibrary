export const topicTypesMap = new Map([
    ['frontend-framework', 'Frontend frameworks'],
    ['markup-language', 'Markup languages'],
    ['platform', 'Platforms'],
    ['programming-language', 'Языки программирования'],
    ['style-language', 'Style languages'],
    ['subject', 'Subjects']
]);

export const topics = [
    {
        id: 'javascript',
        type: 'programming-language',
        title: 'JavaScript'
    }
];

export const topicsMap = new Map([
    ['javascript', 'JavaScript']
]);

export const topicsByType = topics.reduce((result, topic) => {
    if (Array.isArray(result[topic.type])) {
        result[topic.type].push(topic);
    } else {
        result[topic.type] = [topic];
    }

    return result;
}, {});

export default topics;