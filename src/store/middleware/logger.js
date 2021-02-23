const logger = param => store => next => action => {
    console.log(param);
    // console.log("Store :" + store);
    // console.log("Next :" + next);
    // console.log("Action :" + action);
    next(action);
}

export default logger;