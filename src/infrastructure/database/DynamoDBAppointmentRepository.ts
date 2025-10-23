import { DynamoDBClient  } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Appointment } from '../../domain/entities/Appointment';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';

export class DynamoDBAppointmentRepository implements IAppointmentRepository {
  private ddbDocClient: DynamoDBDocumentClient;
  private tableName: string;

  constructor(region: string = 'us-east-1', tableName: string = 'appointments') {
    const client = new DynamoDBClient({ region });
    this.ddbDocClient = DynamoDBDocumentClient.from(client);
    this.tableName = tableName;
  }

  async create(appointment: Appointment): Promise<Appointment> {
    await this.ddbDocClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: appointment,
      })
    );
    return appointment;
  }

  async findById(id: string): Promise<Appointment | null> {
    const result = await this.ddbDocClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      })
    );
    return result.Item as Appointment || null;
  }

  async findAll(): Promise<Appointment[]> {
    const result = await this.ddbDocClient.send(
      new ScanCommand({
        TableName: this.tableName
      })
    );
    // return (result.Items as unknown as Appointment[]) || [];
    return (result.Items as  Appointment[]) || [];
    // const items = result.Items ?? []

    // const appointments: Appointment[] = items.map((item) => {
    //   return {
    //     id:String(item.id),
    //     scheduleId: Number(item.scheduleId),
    //     insureId: String(item.insureId),
    //     countryISO: String(item.countryISO),
    //     status: String(item.status)  as Appointment['status'] 
    //   }
    // })
    // return appointments

  }
}