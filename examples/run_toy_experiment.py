#!/usr/bin/env python3
"""
Comprehensive Toy Experiment Script for SoundByte

This script demonstrates a complete custom experiment with all advanced features:
- Custom minibatch logic
- Advanced components (RAdam, LabelSmoothing, etc.)
- Custom scheduling and evaluation

Usage:
    python examples/run_toy_experiment.py
"""

import sys
from pathlib import Path

# Add src to path for development
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

import logging
from soundbyte import run_experiment, load_config, list_components


def main():
    """Run comprehensive toy experiment."""

    # Setup logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    logger.info("Starting Comprehensive Toy Experiment")

    # Show available components
    print("Available SoundByte Components:")
    components = list_components()
    for comp_type, names in components.items():
        print(f"  {comp_type}: {len(names)} available")
    print()

    # Get config path
    config_path = Path(__file__).parent / "configs/toy_experiment.json"

    if not config_path.exists():
        logger.error(f"Configuration file not found: {config_path}")
        return 1

    logger.info(f"Using configuration: {config_path}")

    try:
        # Load and validate config
        config = load_config(config_path)
        logger.info(f"Loaded configuration for experiment: {config.name}")

        print(f"Experiment Details:")
        print(f"  Dataset: {config.data_ops.name}")
        print(f"  Model: {config.model_ops.name}")
        print(f"  Loss: {config.penalty_ops.name}")
        print(f"  Optimizer: {config.control_ops.name}")
        print(f"  Scheduler: {config.schedule_ops.name if config.schedule_ops else 'None'}")
        print(f"  Custom Logic: {config.data_ops.train_minibatch_logic}")
        print()

        # Run experiment
        results = run_experiment(str(config_path))

        # Print results summary
        print("\n" + "="*60)
        print("COMPREHENSIVE TOY EXPERIMENT COMPLETED")
        print("="*60)

        if 'test_metrics' in results:
            test_metrics = results['test_metrics']
            print(f"Final Test Results:")
            print(f"  Accuracy: {test_metrics.get('accuracy', 0):.2f}%")
            if 'precision' in test_metrics:
                print(f"  Precision: {test_metrics['precision']:.2f}%")
            if 'recall' in test_metrics:
                print(f"  Recall: {test_metrics['recall']:.2f}%")
            if 'f1' in test_metrics:
                print(f"  F1-Score: {test_metrics['f1']:.2f}%")

        print(f"\nTraining Summary:")
        if 'best_val_accuracy' in results:
            print(f"  Best Validation Accuracy: {results['best_val_accuracy']:.2f}%")
        if 'training_time' in results:
            print(f"  Training Time: {results['training_time']:.2f} seconds")
        if 'total_epochs' in results:
            print(f"  Total Epochs: {results['total_epochs']}")

        print(f"\nResults saved to: {config.output_dir}")
        print("="*60)

        return 0

    except Exception as e:
        logger.error(f"Experiment failed: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
