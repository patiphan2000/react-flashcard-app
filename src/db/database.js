import axios from 'axios'

const request = axios.create({ baseURL: 'https://flash-card-dc8b8-default-rtdb.asia-southeast1.firebasedatabase.app/' })

const data = {
    users: [
        {
            email: 'test@email.com',
            category: [
                {
                    name: 'French',
                    flashcards: [
                        {
                            front: {
                                text: 'front',
                                subText: 'front sub'
                            },
                            back: {
                                text: 'back',
                                subText: 'back sub'
                            }
                        },
                        {
                            front: {
                                text: 'front2',
                                subText: 'front sub'
                            },
                            back: {
                                text: 'back2',
                                subText: 'back sub'
                            }
                        }
                    ]
                },
            ]
        },
    ]
}

export function getFlashcard() {
    request.get('/flashcard.json').then(response => {
        const fetchData = [];
        for (let key in response.data) {
            fetchData.unshift(
                {
                ...response.data[key],
                id: key
                }
            )
        }
        console.log(fetchData[0]);
    })
}

export function updateFlashcard({ flashcardInfo }) {
    var newData = data;
    newData['users'].push({
        email: 'spider@email.com',
        category: [
            {
                name: 'Food',
                flashcards: [
                    {
                        front: {
                            text: 'Orange',
                            subText: 'front sub'
                        },
                        back: {
                            text: 'ส้ม',
                            subText: 'back sub'
                        }
                    },
                    {
                        front: {
                            text: 'Apple',
                            subText: 'front sub'
                        },
                        back: {
                            text: 'แอปเปิล',
                            subText: 'back sub'
                        }
                    }
                ]
            },
        ]
    })
    request.patch('/flashcard.json', newData).then(response => {
        console.log(response);
    })
}
