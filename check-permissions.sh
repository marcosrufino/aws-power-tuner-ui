#!/bin/bash

echo "=== Verificando Permissões AWS ==="

echo "1. Identidade atual:"
aws sts get-caller-identity

echo -e "\n2. Testando permissões Lambda:"
aws lambda list-functions --max-items 1 > /dev/null 2>&1 && echo "✅ Lambda: OK" || echo "❌ Lambda: Sem permissão"

echo -e "\n3. Testando permissões IAM:"
aws iam list-roles --max-items 1 > /dev/null 2>&1 && echo "✅ IAM: OK" || echo "❌ IAM: Sem permissão"

echo -e "\n4. Testando permissões CloudFormation:"
aws cloudformation list-stacks --max-items 1 > /dev/null 2>&1 && echo "✅ CloudFormation: OK" || echo "❌ CloudFormation: Sem permissão"

echo -e "\n5. Testando permissões Step Functions:"
aws stepfunctions list-state-machines --max-items 1 > /dev/null 2>&1 && echo "✅ Step Functions: OK" || echo "❌ Step Functions: Sem permissão"

echo -e "\n6. Testando Serverless Application Repository:"
aws serverlessrepo list-applications --max-items 1 > /dev/null 2>&1 && echo "✅ SAR: OK" || echo "❌ SAR: Sem permissão"

echo -e "\n7. Verificando limites de Lambda:"
aws service-quotas get-service-quota --service-code lambda --quota-code L-B99A9384 2>/dev/null | grep -E "(Value|QuotaName)" || echo "Não foi possível verificar quotas"

echo -e "\n=== Verificação Completa ==="