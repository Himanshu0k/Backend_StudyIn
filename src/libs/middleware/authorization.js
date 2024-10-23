
const permissionValidator = {
    attendance: { read: false, write: false },
    timeTable: { read: false, write: false },
    notes: { read: false, write: false },

    // Function to handle reading permissions and return string messages
    handleReadPermission: (data, tasks) => {
        if (data === '') {
            return 'No task is provided';
        }

        if (tasks.includes(data)) {
            return `You can read the ${data}`;
        } else {
            return `You cannot read the ${data}`;
        }
    },

    handleWritePermission: (data, tasks) => {
        if (data === '') {
            return 'No task is provided';
        }

        if (tasks.includes(data)) {
            return `You can write the ${data}`;
        } else {
            return `You cannot write the ${data}`;
        }
    },

    // Student read permission
    studentRead: (data = '') => {
        const tasks = ['attendance', 'notes', 'time table'];

        // Grant read access
        permissionValidator.attendance.read = true;
        permissionValidator.timeTable.read = true;
        permissionValidator.notes.read = true;

        return permissionValidator.handleReadPermission(data, tasks);
    },

    // Student write permission
    studentWrite: (data = '') => {
        if (data === '') {
            return 'No task is provided';
        } else {
            return `You cannot write the ${data}`;
        }
    },

    // Teacher read permission
    teacherRead: (data = '') => {
        const tasks = ['attendance', 'notes', 'time table'];

        // Grant read access
        permissionValidator.attendance.read = true;
        permissionValidator.notes.read = true;
        permissionValidator.timeTable.read = true;

        return permissionValidator.handleReadPermission(data, tasks);
    },

    // Teacher write permission
    teacherWrite: (data = '') => {
        const tasks = ['attendance', 'notes'];

        // Grant write access
        permissionValidator.attendance.write = true;
        permissionValidator.notes.write = true;

        return permissionValidator.handleWritePermission(data, tasks);
    }
};

export default permissionValidator;
