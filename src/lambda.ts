import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { configureDependencies } from './infrastructure/config/dependencies';

const { 
    createAppointmentUseCase,
    getAllAppointmentsUseCase,
    // findByIdAppointmentUseCase,
} = configureDependencies();

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    try {
        console.log('Event:', JSON.stringify(event));

        // const httpMethod = event.httpMethod;
        const httpMethod = event.requestContext.httpMethod;

        if (httpMethod === 'POST') {
            if (!event.body) {
                 return {
                    statusCode: 400,
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({ message: 'Request body is required for POST method' }),
                };
            }
            
            const appointmentData = JSON.parse(event.body);

            const newAppointment = await createAppointmentUseCase.execute(appointmentData);

            return {
                statusCode: 201, // 201 Created
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(newAppointment),
            };
        }
        
        else if (httpMethod === 'GET') {
            
            const appointmentId = event.pathParameters ? event.pathParameters.id : null;

                const allAppointments = await getAllAppointmentsUseCase.execute();

                return {
                    statusCode: 200, 
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(allAppointments),
                };
            // }
        }

        return {
            statusCode: 405, // Method Not Allowed
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ message: `Method ${httpMethod} not supported` }),
        };

    } catch (error) {
        console.error('Error:', error);
        
        let statusCode = 500;
        let errorMessage = 'Internal server error';

        if (error instanceof SyntaxError && error.message.includes('JSON')) {
             statusCode = 400;
             errorMessage = 'Invalid JSON format in request body';
        }
        
        return {
            statusCode: statusCode,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: error instanceof Error ? error.message : errorMessage,
            }),
        };
    }
};