# Checklist LGPD — minimização & proteção (defensivo)

> Não é aconselhamento jurídico. Use com o DPO / jurídico da sua organização.

## Minimização (Art. 6º, III)
- [ ] Cada campo de dado pessoal tem finalidade explícita
- [ ] Não coletar CPF/documento se e-mail + ID interno bastam
- [ ] Evitar cópias “por precaução” em logs, analytics e backups eternos

## Segurança (Art. 6º, VII)
- [ ] Criptografia em trânsito (TLS 1.2+; preferir 1.3)
- [ ] Controle de acesso por função (least privilege)
- [ ] Segredos fora do repositório (vault / secrets manager)

## Direitos do titular
- [ ] Canal para acesso / correção / exclusão
- [ ] Prazo de retenção documentado
- [ ] Registro de operações de tratamento (quando aplicável)

## Agentes / automação
- [ ] HITL antes de enviar dados pessoais a terceiros
- [ ] Dry-run padrão para outreach
- [ ] Auditoria (quem, quando, o quê) em ações irreversíveis

— Felipe Fernandes · Crystal Engineer / Agentic AI  
Projetos relacionados: TrustHire (anti-fraude) · secure-ship-kit
