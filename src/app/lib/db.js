const { DB_USER, DB_PASSWORD } = process.env;
export const connectionStr = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fqu0mn4.mongodb.net/easy_task_manager?retryWrites=true&w=majority&appName=Cluster0`;
