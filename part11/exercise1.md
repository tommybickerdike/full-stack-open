# Exercise 1

CI setup for theoretical Ruby app

## CI Setup

### Linting

It appears that Rubocop could be a potential candidate for a linting step in the CI pipeline

### Testing

Cucumber or RSPEC seem to be a good contenders for an acceptance testing phase. Cucumber may have costs attached though depending on what is required.

### Building

Rake seems to be the most common build tool for Ruby. It appears that it can also wrap the Linting phases as rake_task.rb files but more investigation would be needed. If the project uses Rails then it contains build tools already.

## Alternative CI Tools

Gitlab CI/CD is an alternative tool to use and seems to be comparibible to Github actions. The main change would be developers working on a Gitlab repository.

Buddy is an enterprise option which seems to offer a large feature set and can be scaled at a cost if more options, RAM or projects are required.

## Cloud or self hosted

It is most likely that a cloud based environment would be best for the project but it depends on the scale of the application and the recourses required. If it is very heavy on graphics requirements or RAM requirements then cloud solutions might be more costly than cloud based.
