import { connect } from "mongoose";

const db_uri = process.env.db_uri;
connect(db_uri); 