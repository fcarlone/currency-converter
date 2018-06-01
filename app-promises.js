const users = [{
  id: 1,
  name: 'Frank',
  schoolId: 101
}, {
  id: 2,
  name: 'Andrew',
  schoolId: 201
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
}, {
  id: 2,
  schoolId: 201,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => {
      return user.id === id;
    });

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`);
    }
  });
};

// old function syntax
const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

// Andrew has a 83 average in the class
const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser
    return getGrades(user.schoolId);
  }).then((grades) => {
    // average
    let average = 0;

    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    // return string
    return `${user.name} has a ${average} average in class.`
  });
};

// async await function
// async and await are keywords
const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;

  // console.log(user, grades);
  if (grades.length > 0) {
    average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
  }
  // return string
  return `${user.name} has a ${average}% average in class.`
};


// const getStatusAlt = async (userId) => {
//   throw new Error('This is an error'); // same as Promise reject
//   return 'Mike';
// };

getStatusAlt(2).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});

// getUser(1).then((user) => {
//   console.log(user);
// }).catch((e) => {
//   console.log(e);
// });
//
// getGrades(101).then((grades) => {
//   console.log(grades);
// }).catch((e) => {
//   console.log(e);
// });
//
// getStatus(1).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// });
