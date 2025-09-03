import * as cdk from '@aws-cdk/core';
import sam = require('@aws-cdk/aws-sam');

export class PowerTunerOnlyStack extends cdk.Stack {
  public readonly stateMachineArn: string;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create power tuner step function with minimal configuration
    const powerTuner = new sam.CfnApplication(this, 'powerTuner', {
      location: {
        applicationId: 'arn:aws:serverlessrepo:us-east-1:451282441545:applications/aws-lambda-power-tuning',
        semanticVersion: '4.1.0'
      },
      parameters: {
        'lambdaResource': `arn:aws:lambda:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:function:*`,
        'PowerValues': '128,256,512',
        'totalExecutionTimeout': '300',
        'analysisType': 'cost',
        'payloadS3Bucket': '',
        'payloadS3Key': '',
        'parallelInvocation': 'false',
        'sleepingTime': '0'
      }
    });

    this.stateMachineArn = powerTuner.getAtt('Outputs.StateMachineARN').toString();

    // Output the State Machine ARN for reference
    new cdk.CfnOutput(this, 'PowerTunerStateMachineArn', {
      value: this.stateMachineArn,
      description: 'ARN of the Power Tuner State Machine'
    });
  }
}