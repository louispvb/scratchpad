function [J grad] = nnCostFunction(nn_params, ...
                                   input_layer_size, ...
                                   hidden_layer_size, ...
                                   num_labels, ...
                                   X, y, lambda)
%NNCOSTFUNCTION Implements the neural network cost function for a two layer
%neural network which performs classification
%   [J grad] = NNCOSTFUNCTON(nn_params, hidden_layer_size, num_labels, ...
%   X, y, lambda) computes the cost and gradient of the neural network. The
%   parameters for the neural network are "unrolled" into the vector
%   nn_params and need to be converted back into the weight matrices. 
% 
%   The returned parameter grad should be a "unrolled" vector of the
%   partial derivatives of the neural network.
%

% Reshape nn_params back into the parameters Theta1 and Theta2, the weight matrices
% for our 2 layer neural network
Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
                 hidden_layer_size, (input_layer_size + 1));

Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
                 num_labels, (hidden_layer_size + 1));

% Setup some useful variables
m = size(X, 1);
         
% You need to return the following variables correctly 
J = 0;
Theta1_grad = zeros(size(Theta1));
Theta2_grad = zeros(size(Theta2));

% ====================== YOUR CODE HERE ======================
% Instructions: You should complete the code by working through the
%               following parts.
%
% Part 1: Feedforward the neural network and return the cost in the
%         variable J. After implementing Part 1, you can verify that your
%         cost function computation is correct by verifying the cost
%         computed in ex4.m
%
% Part 2: Implement the backpropagation algorithm to compute the gradients
%         Theta1_grad and Theta2_grad. You should return the partial derivatives of
%         the cost function with respect to Theta1 and Theta2 in Theta1_grad and
%         Theta2_grad, respectively. After implementing Part 2, you can check
%         that your implementation is correct by running checkNNGradients
%
%         Note: The vector y passed into the function is a vector of labels
%               containing values from 1..K. You need to map this vector into a 
%               binary vector of 1's and 0's to be used with the neural network
%               cost function.
%
%         Hint: We recommend implementing backpropagation using a for-loop
%               over the training examples if you are implementing it for the 
%               first time.
%
% Part 3: Implement regularization with the cost function and gradients.
%
%         Hint: You can implement this around the code for
%               backpropagation. That is, you can compute the gradients for
%               the regularization separately and then add them to Theta1_grad
%               and Theta2_grad from Part 2.
%


% X : 5000x400
% Theta1 : 25x401
% Theta2 : 10x26

% The y labels come in as a column vec of digits from 1-10
% We need vectors with positional arguments for Y instead, where [0 0 1] 
% represents a y value of 3 (position of the 1 is 3rd)

I = eye(num_labels);
Y = zeros(m, num_labels); % 5000x10
for i = 1:m 
  Y(i, :) = I(y(i), :);
end

% --- FORWARD PROPAGATION
X = a1 = [ones(m, 1) X]; % 5000x401
z2 = X * Theta1'; % 5000x25
a2 = sigmoid(z2); % 5000x25
a2 = [ones(m, 1) a2]; % 5000x26
H = a3 = sigmoid(a2 * Theta2'); % 5000x10

% J = (1/m) * sum(-Y .* log(a3) - (1 - Y) .* log(1 - a3));

% --- COST FUNCTION + REGULARIZATION
costf = -Y .* log(H) - (1 - Y) .* log(1 - H);

% Trim out the bias term for regularization
regularization = (lambda / (2 * m)) * ...
                 (sum(sum(Theta1(:,2:end) .^ 2)) + sum(sum(Theta2(:,2:end) .^ 2)));
J = (1 / m) * sum(sum(costf)) + regularization; % 1x1

% --- BACKPROPAGATION

d3 = H - Y; % 5000x10 - 5000 samples of errors for 10 outputs
% 5000x10 * 10x25 = 5000x25 * 5000x25 = 5000x25 - 5000 samples of errors for 25 hidden units
d2 = (d3 * Theta2(:,2:end)) .* sigmoidGradient(z2);

Delta1 = d2' * a1; % 25x5000 * 5000x401 = 25x401 - cumulative error of 25 hidden units with 401 columns of params 
Delta2 = d3' * a2; % 10x5000 * 5000x26 = 10x26 - error of outputs with 26 params each

% Replace first columns of theta with zeros so we don't regularize bias terms
Theta1(:, 1) = zeros(size(Theta1, 1), 1);
Theta2(:, 1) = zeros(size(Theta2, 1), 1);

reg1 = (lambda / m) * Theta1;
reg2 = (lambda / m) * Theta2;

Theta1_grad = Delta1 ./ m + reg1;
Theta2_grad = Delta2 ./ m + reg2;
% -------------------------------------------------------------

% =========================================================================

% Unroll gradients
grad = [Theta1_grad(:) ; Theta2_grad(:)];


end
