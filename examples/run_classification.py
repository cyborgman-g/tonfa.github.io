#!/usr/bin/env python3
"""
Classification Example Script for SoundByte

This script demonstrates running a supervised classification experiment
using the SoundByte toolkit with CIFAR-10 dataset.

Usage:
    python examples/run_classification.py
"""

import sys
from pathlib import Path

# Add src to path for development
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

import logging
from soundbyte import run_experiment, load_config


def main():
    """Run classification example."""

    # Setup logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    # Get config path
    config_path = Path(__file__).parent / "configs/classification_example.json"

    if not config_path.exists():
        logger.error(f"Configuration file not found: {config_path}")
        return 1

    logger.info("Starting CIFAR-10 classification example")
    logger.info(f"Using configuration: {config_path}")

    try:
        # Load and validate config
        config = load_config(config_path)
        logger.info(f"Loaded configuration for experiment: {config.name}")

        # Run experiment
        results = run_experiment(str(config_path))

        # Print results summary
        print("\n" + "="*60)
        print("CLASSIFICATION EXPERIMENT COMPLETED")
        print("="*60)

        if 'test_metrics' in results:
            test_metrics = results['test_metrics']
            print(f"Test Accuracy: {test_metrics.get('accuracy', 0):.2f}%")
            if 'precision' in test_metrics:
                print(f"Test Precision: {test_metrics['precision']:.2f}%")
            if 'recall' in test_metrics:
                print(f"Test Recall: {test_metrics['recall']:.2f}%")
            if 'f1' in test_metrics:
                print(f"Test F1-Score: {test_metrics['f1']:.2f}%")

        if 'best_val_accuracy' in results:
            print(f"Best Validation Accuracy: {results['best_val_accuracy']:.2f}%")

        if 'training_time' in results:
            print(f"Training Time: {results['training_time']:.2f} seconds")

        print(f"Results saved to: {config.output_dir}")
        print("="*60)

        return 0

    except Exception as e:
        logger.error(f"Experiment failed: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
