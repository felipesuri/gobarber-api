# GoBarber

## Dicionário

**RF** = Requisitos funcionais - São as funcionalidades.
**RNF** = Requisitos não funcionais - São coisas que não estão ligadas diretamente com a regra de negócios.
**RN** = Regras de negócios.

## Funcionalidades macros da aplicação

- [ ] Recuperação de senha
- [ ] Atualização do perfil
- [ ] Painel do prestador
- [ ] Agendamento de serviços

## Funcionalidades micro da aplicação

## Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informado o seu email
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário deve poder modificar sua senha

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento
- Utilizar Amazon SES para envios em produção
- O envio de e-mails deve acontecer em segundo plano (background job)

**RN**

- O link enviado por e-mail para ser inválido senha, deve expirar em 2 horas
- O usuário precisa confirmar a nova senha ao modifica-la

## Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha

**RN**

- O usuário não pode alterar seu e-mail para um email já utilizado
- Para atualizar sua senha o usuário deve informar a senha antiga
- Para atualizar sua senha o usuário deve confirmar a nova senha

## Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia, devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar

## Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache

**RN**

- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis entre 8h as 17h
- O usuário não pode agendar um horário já ocupado
- O usuário não pode agendar em um horário que já passou
- O usuário não pode agendar serviços consigo mesmo